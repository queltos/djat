from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login$', views.login_page, name='login'),
    url(r'^auth$', views.auth, name='auth'),
    url(r'^logout$', views.logout_page, name='logout'),
]
