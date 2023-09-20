from rest_framework.response import Response
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

class FooViewSet(viewsets.ViewSet):
    # TODO(austin): remove me -- make this real
    def list(self, request):
        return Response({
            "hello": "Austin",
            "hi": "Long"
        })
    
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer