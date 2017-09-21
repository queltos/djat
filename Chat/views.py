from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST


@login_required(login_url='/login')
def index(request):
    return redirect('http://localhost:3000')
    # context = {'user': request.user.username}
    # return render(request, 'Chat/main.html', context)


@require_POST
def auth(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(
        request,
        username=username,
        password=password)

    if user is not None:
        login(request, user)
        return redirect('/')
    else:
        return redirect('/login')


def logout_page(request):
    logout(request)
    return redirect('/login')


def login_page(request):
    return render(request, 'Chat/login.html')
