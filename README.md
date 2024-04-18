URUCHOMIENIE APLIKACJI PRZY UŻYCIU DOCKERA

WINDOWS + MAC
```
services:

  db:
    image: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
  cms-app:
    image: bartoszprogramista/cms-server
    ports:
      - "5000:5000"
    environment:
      DB_CONNECTION_STRING: Host=host.docker.internal;Database=dupa;Username=postgres;Password=postgres
      ASPNETCORE_URLS: http://+:5000
      
  cms-ui:
    image: bartoszprogramista/cms-ui
    ports:
      - "80:80"
```
LINUX
https://github.com/docker/for-linux/issues/264#issuecomment-784985736
```
services:

  db:
    image: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
    extra_hosts:
     - "host.docker.internal:host-gateway"
  cms-app:
    image: bartoszprogramista/cms-server
    ports:
      - "5000:5000"
    environment:
      DB_CONNECTION_STRING: Host=host.docker.internal;Database=dupa;Username=postgres;Password=postgres
      ASPNETCORE_URLS: http://+:5000
    extra_hosts:
     - "host.docker.internal:host-gateway"
  cms-ui:
    image: bartoszprogramista/cms-ui
    ports:
      - "80:80"
    extra_hosts:
     - "host.docker.internal:host-gateway"
```
zapisanie to w jakimś pliku yml i uruchomienei komendy
```
docker compose -f <nazwa pliku>.yml up
```
jak wam się nie uruchomi serwer z powodu poniższego błędu nalezy zaktualizować wersję silnika dockerowego 
```
Failed to create CoreCLR
```

aplikacja domyślnie działa na portach:

-server -> 5000

-ui -> 80

jak chcecie zmieniać porty to należy również zmienić konfigurację nginx w kontenerze cms-ui w pliku
```
/etc/nginx/nginx.conf
```
i zrestartować kontenery

jak nie macie ustawionego host.docker.internal w pliku hosts to go dodajcie i ustawicie (rozwiązanie dla windowsa, dla linuxa lepiej w docker compose jak wyżej dodać extra_hosts)
```
<adres ip pc> host.docker.internal 
np. 192.168.1.103 host.docker.internal
```

po dodaniu kontenerów zalecane jest skorzystanie z przykładowego dumpa bazy który zawiera przykładową stronę i konto administratora

dump znajduje się w tym repo pod plikiem db_dump.rar
```
docker exec -i <nazwa kontenera pg> /bin/bash -c "PGPASSWORD=postgres psql --username postgres dupa" < db_dump.sql
```
Dump nie zawiera tworzenia bazy, bazę danych należy samemu utworzyć zgodnie z nazwą podaną w konfiguracji

Domyślne konto administratora:

Login
```
Admin
```
Hasło
```
Password#=123
```
