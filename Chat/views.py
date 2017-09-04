from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


@login_required
def index(request):
    context = {'user': request.user.username}
    return render(request, 'Chat/main.html', context)


def auth(request):
    # username = request.POST['username']
    # password = request.POST['password']
    username = 'dan'
    password = 'djangodjango'
    user = authenticate(
        request,
        username=username,
        password=password)

    if user is not None:
        login(request, user)
        return redirect('/')

