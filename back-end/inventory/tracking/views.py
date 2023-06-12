from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
import json

class FooViewSet(ViewSet):
    # TODO(austin): remove me -- make this real
    def list(self, request):
        return Response({
            "hello": "Austin",
            "hi": "Long"
        })
    
    @action(detail=False, methods=['get'])
    def getData(self, request):
        with open('/back-end/inventory/tracking/data/data.json', 'r') as file:
            data = file.read()
        jsonData = json.loads(data)

        return Response(jsonData)
    
    @action(detail=False, methods=['post'])
    def postData(self, request, *args, **kwargs):
        data = request.data
        with open('/back-end/inventory/tracking/data/data.json', 'w') as file:  # open in write mode
            json.dump(data, file)  # write the data to the json file
        return Response({"message": "Success!"})
    

