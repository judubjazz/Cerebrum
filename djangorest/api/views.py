from rest_framework import status,generics
from .serializers import BucketlistSerializer
from .models import Bucketlist
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Bucketlist.objects.all()
    serializer_class = BucketlistSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()

    def index(request):
        rest_list = Bucketlist.objects.order_by('sort_order')
        context = {'rest_list': rest_list}
        #return render(request, 'food/index.html', context)
  
    # Rest api end point
    def get_rest_list(request):
        """
        Returns Json list of all request
        """
        if request.method == "GET":
            rest_list = Bucketlist.objects.order_by('sort_order')
            serializer = BucketlistSerializer(rest_list, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST':
            serializer = BucketlistSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = Bucketlist.objects.all()
    serializer_class = BucketlistSerializer
