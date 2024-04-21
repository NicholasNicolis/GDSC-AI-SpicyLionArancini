# your_app_name/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Item, Example
from .serializers import ItemSerializer, ExampleSerializer
import base64
import tzdata
#from django.forms import UploadFileForm
from django.http import JsonResponse
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import TextLoader
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.indexes import VectorstoreIndexCreator
from langchain_experimental.agents.agent_toolkits.csv.base import create_csv_agent
from langchain.agents.agent_types import AgentType
from langchain.memory import ConversationBufferMemory
import tiktoken
from langchain.text_splitter import CharacterTextSplitter
import os


def create_basic_profile_prompt(profilation):
    prompt = f"""Hi! I'm {profilation['age']} years old and I'm attending {profilation["schoolOrJob"]}.
        I would like to study, 
        and in particular: {profilation['studyDescription']}.
        I commonly tend to study in a specific way, following this methodology: {profilation["methodPreference"]}.
        My goals are: {profilation["studyGoal"]}.
        These are my information on how i study and how i approach gaining new knowledge."""
    return prompt


basic_prompt = None


class ItemCreateView(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


    '''def post(self, request, *args, **kwargs):
        print("POST request data:", request.data)  # Print POST data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Custom response data
        response_data = {
            'data': {'age': 4,
                    'schoolOrJob': "ciaoneeeee",
                    'studyDescription': "ma va",
                    'studyGoal': "paraschelitte",
                    'methodPreference': "vaffanciu"
            }
        }
        basic_prompt = create_basic_profile_prompt(request.data)

        return Response(request.data, status=status.HTTP_201_CREATED)'''

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            f = request.FILES['files'].file

            # Define a path to save the file
            file_path = os.path.join('./', 'uploaded_file.pdf')

            # Save the file to the defined path
            with open(file_path, 'wb') as file:
                file.write(f.read())

            # send this file to GPT to generate the json map 
            
            # Prompt the user for their OpenAI API key
            #api_key = input("Please enter your OpenAI API key: ")
            with open('./backend/GDSC/api_key.txt', 'r') as file:
                api_key = file.read()

            # Set the API key as an environment variable
            os.environ["OPENAI_API_KEY"] = api_key

            # Optionally, check that the environment variable was set correctly
            print("OPENAI_API_KEY has been set!")
            llm_model = "gpt-4-turbo"

            # import a PDF file and convert it to text
            import PyPDF2
            def pdf_to_vectorstore(pdf_path):
                with open(pdf_file_path, 'rb') as file:
                    reader = PyPDF2.PdfReader(file)
                    text = ''
                    for page_num in range(len(reader.pages)):
                        text += reader.pages[page_num].extract_text()
                txt_file_path = f'tmp.txt'
                with open(txt_file_path, 'w', encoding='utf-8') as txt_file:
                  txt_file.write(text)
                loader = TextLoader(file_path=txt_file_path, encoding="utf-8")
                data = loader.load()
                text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
                split_text = text_splitter.split_documents(data)
                print(len(split_text[0].page_content))
                embeddings = OpenAIEmbeddings()
                vectorstore = FAISS.from_documents(split_text, embedding=embeddings)
                return vectorstore

            def gen_chain(vectorstore):
                llm = ChatOpenAI(temperature=0.35, model_name="gpt-4-turbo")
                memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
                return ConversationalRetrievalChain.from_llm(
                    llm=llm,
                    chain_type="stuff",
                    retriever=vectorstore.as_retriever(),
                    memory=memory
                    )

            pdf_file_path = 'uploaded_file.pdf'
            vectorstore = pdf_to_vectorstore(pdf_file_path)
            conversation_chain = gen_chain(vectorstore)
            # send the prompt to tell the model who the user is 
            with open("prompt.txt", "r") as f:
                basic_prompt = f.read()
            res1 = conversation_chain({"question": basic_prompt})
            print(res1['answer'])
        
            query = "Summarize the file into a mindmap, generating it in JSON format. Clearly separate different topics."
            result = conversation_chain({"question": query})
            answer = result["answer"]

            map = answer[answer.index('{') : len(answer) - answer[::-1].index('}') ]
            import json
            def print_json_tree(data, indent=0):
                if isinstance(data, dict):
                    for key, value in data.items():
                        # if(indent!=0):
                        print('    ' * indent + '└── ' + str(key))
                        # else:
                        # print(str(key))
                        print_json_tree(value, indent + 1)
                elif isinstance(data, list):
                    for item in data:
                        print_json_tree(item, indent)
                else:
                    # if(indent!=0):
                    print('    ' * indent + '└── ' + str(data))
                    # else:
                        # print('    ' * indent + str(data))

            data = json.loads(map)

            return JsonResponse(data, status=200)
        else:
            return JsonResponse({'error': 'Invalid request method'}, status=405)
        
class ItemCreateViewForm(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def post(self, request, *args, **kwargs):
        print("POST request data:", request.data)  # Print POST data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Custom response data  
        # response_data = {
        #     'data': {'age': request.data["age"],
        #             'schoolOrJob': request.data["schoolOrJob"],
        #             'studyDescription': request.data["studyDescription"],
        #             'studyGoal': request.data["studyGoal"],
        #             'methodPreference': request.data["methodPreference"]
        #     }
        # }
        basic_prompt = create_basic_profile_prompt(request.data)
        with open("prompt.txt", "w") as f:
            f.write(basic_prompt)
        # invoke GPT with prompt 
        # result = conversation_chain({"question": basic_prompt})
        # answer = result["answer"]
        # print(answer)
        return Response(request.data, status=status.HTTP_201_CREATED)
    

class Example(generics.CreateAPIView):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer

    def post(self, request, *args, **kwargs):
        print("POST request data:", request.data)   

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(request.data, status=status.HTTP_201_CREATED)

