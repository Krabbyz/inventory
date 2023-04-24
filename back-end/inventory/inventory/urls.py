from django.contrib import admin
from django.conf import settings
from django.conf.urls import url
from django.urls import path, include
from django.views.static import serve


urlpatterns = [
    path('admin/', include('massadmin.urls')),
    path('admin/', admin.site.urls),
    path('', include('tracking.urls')),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
]
