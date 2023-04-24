FROM python:3.10.8
WORKDIR /back-end
COPY . .
RUN pip install -r requirements.txt
RUN mkdir -p /back-end/inventory/static/
EXPOSE 8000