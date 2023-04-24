from rest_framework.routers import SimpleRouter
from .views import FooViewSet


router = SimpleRouter()
router.register('tracking-list', FooViewSet, basename='tracking')


urlpatterns = router.urls
