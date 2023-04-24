from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

class FooViewSet(ViewSet):
    # TODO(austin): remove me -- make this real
    def list(self, request):
        return Response({
            "hello": "Austin",
            "hi": "Long"
        })
