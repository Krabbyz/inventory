python /back-end/inventory/manage.py migrate
mkdir -p /back-end/inventory/static
python /back-end/inventory/manage.py collectstatic --clear --no-input
python /back-end/inventory/manage.py runserver 0.0.0.0:8000