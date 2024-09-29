import os
from celery import Celery
from celery.signals import task_failure

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BreakWordTrapsBackend.settings')

app = Celery('BreakWordTrapsBackend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

@task_failure.connect
def handle_task_failure(**kwargs):
    task = kwargs.get('sender')
    exception = kwargs.get('exception')
    traceback = kwargs.get('traceback')
    einfo = kwargs.get('einfo')
    
    print(f"Task {task.name} raised exception: {exception}")
    print(f"Exception info: {einfo}")
    print(f"Traceback: {traceback}")