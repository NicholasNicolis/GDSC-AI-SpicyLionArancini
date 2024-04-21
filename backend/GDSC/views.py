# your_app_name/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer


def create_basic_profile_prompt(profilation):
    prompt = f"""Hi! I'm {profilation['age']} years old and I'm attending {profilation["schoolOrJob"]}.
        I would like to study, 
        and in particular: {profilation['studyDescription']}.
        I commonly tend to study in a specific way, following this methodology: {profilation["methodPreference"]}.
        My goal are: {profilation["studyGoal"]}.
        These are my information on how i study and how i approach gaining new knowledge."""
    return prompt



class ItemCreateView(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


    def post(self, request, *args, **kwargs):
        print("POST request data:", request.data)  # Print POST data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Custom response data
        '''response_data = {
            'data': {'age': 4,
                    'schoolOrJob': "ciaoneeeee",
                    'studyDescription': "ma va",
                    'studyGoal': "paraschelitte",
                    'methodPreference': "vaffanciu"
            }
        }'''
        basic_prompt = create_basic_profile_prompt(request.data)

        return Response(request.data, status=status.HTTP_201_CREATED)

    
    
