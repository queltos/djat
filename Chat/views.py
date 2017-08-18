from django.shortcuts import render


def index(request):
    context = {}
    return render(request, 'Chat/main.html', context)
