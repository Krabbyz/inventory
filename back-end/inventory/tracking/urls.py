from .views import FooViewSet, ItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('foo', FooViewSet, basename='foo')
router.register(r'tracking-list', ItemViewSet)

urlpatterns = router.urls
