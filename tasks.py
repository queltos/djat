from invoke import task

@task
def worker(ctx):
    ctx.run("python manage.py runworker")

@task
def daphne(ctx):
    # DJANGO_SETTINGS_MODULE=djat.settings has to be set
    ctx.run("daphne -b 0.0.0.0 djat.asgi:channel_layer")