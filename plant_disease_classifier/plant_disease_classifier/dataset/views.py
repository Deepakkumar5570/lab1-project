from django.shortcuts import render

# Create your views here.
# dataset/views.py

from django.shortcuts import render
from .models import PlantLeaf
from django.http import JsonResponse

def index(request):
    current_file_number = PlantLeaf.objects.all().count() + 1
    return render(request, 'index.html', {'current_file_number': current_file_number})

def capture_image(request):
    if request.method == 'POST':
        file_number = request.POST.get('file_number')
        image = request.FILES.get('image')
        
        # Save the photo with the appropriate file number
        leaf = PlantLeaf(image=image, file_number=file_number)
        leaf.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'fail'})
