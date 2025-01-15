# 1. Install Python
  ## Make sure you have Python installed on your machine. You can check by running:
     python --version
# Install virtualenv and set up a virtual environment:  
      pip install virtualenv
      python -m venv venv
 # Activate the virtual environment: On Windows: 
     venv\Scripts\activate
 # Install Django and other necessary packages:   
     pip install django
     pip install pillow  # For image handling
     pip freeze > requirements.txt
 # Create a new Django project:
     django-admin startproject plant_disease_classifier
     cd plant_disease_classifier
 # Create a new Django app:    
     python manage.py startapp dataset

 # Create directories for media storage:
     mkdir media
     mkdir media/plant_leaves

# Apply initial migrations:
     python manage.py migrate
# Run the development server:
      python manage.py runserver

