# ubikate-umss
Desarrollo de una aplicación móvil para visitas dentro el campus de la UMSS usando Geolocalización.

# Installation


https://trac.osgeo.org/postgis/wiki/UsersWikiPostGIS22UbuntuPGSQL95Apt


### Install Postgress

_Postgres 9.4.8 or higher_  


    $ sudo apt-get update
    $ sudo apt-get install -y postgresql postgresql-contrib

### Install Postgis

_Postgis 2.1_


    $ sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
    $ sudo apt-get install -y postgis postgresql-9.4-postgis-2.1

### Install PgRouting

_pgRouting 2.2_
  
to install pgRouting -> http://docs.pgrouting.org/2.1/en/doc/src/installation/index.html

    # Add pgRouting launchpad repository ("stable" or "unstable")
    sudo add-apt-repository ppa:georepublic/pgrouting[-unstable]
    sudo apt-get update

    # Install pgRouting packages
    sudo apt-get install postgresql-9.4-pgrouting

## Seting up the Database

The names that will be used:

    USER_NAME = db_admin
    password = admin
    DATABASE_NAME = db_ubikate

Enabling Admin pack

    sudo -u postgres psql
    CREATE EXTENSION adminpack;
    \q


Create a Database user

    # this will prompt you for a database password
    sudo -u postgres createuser -d -E -i -l -P -r -s USER_NAME_HERE
    sudo -u postgres createdb -O USER_NAME_HERE DATABASE_NAME_HERE

Test connecting to Postgresql

    psql -h localhost -U USER_NAME_HERE DATABASE_NAME_HERE

Postgresql will ask you for your password. Then you should see:

    psql (9.4.8)
    Type "help" for help.

    DATABASE_NAME_HERE=>  --this means that your are connected to the database 

To exit type:

    \q

    

### Add pgRouting functions to a database

PostGIS is an extension that must be enabled in each database you want to use it in before you can use it. Installing the software is just the first step. DO NOT INSTALL it in the database called postgres.

Connect to your database with psql or PgAdmin, and run the following sql.


    sudo -u postgres psql -c "
    CREATE EXTENSION adminpack; CREATE EXTENSION postgis;
    CREATE EXTENSION postgis_topology;
    CREATE EXTENSION pgrouting;
    CREATE EXTENSION fuzzystrmatch;
    CREATE EXTENSION postgis_tiger_geocoder;
    " DATABASE_NAME_HERE

verify installation

    psql -h localhost -U USER_NAME_HERE DATABASE_NAME_HERE

    SELECT postgis_full_version();
    SELECT * FROM pgr_version();

##Enabling access to clients

You may need to edit to pg_hba.conf and/or pg_ident.conf, postgresql.conf to allow external access

    sudo nano /etc/postgresql/9.4/main/pg_hba.conf

If you need external access, scroll to the bottom of the pg_hba.conf file and add a line like this (which willa llow all clients with md5 password encrypt authentication (right after the local rules):


    hostssl  all             all             0.0.0.0/0               md5
    local   all             postgres                                trust
    local   all             all                                     trust
    host    all             all             127.0.0.1/32            trust
    host    all             all             ::1/128                 trust
_this is my set up, the file has already permisions that must be commented to the above config works_


####restart service.

    sudo service postgresql restart

 # Set up Ubikate database

The names that will be used:

    USER_NAME = db_admin
    pasword = admin
    DATABASE_NAME = db_ubikate

To fill the Ways table with the linestrings that are the paths inside the campus (command line)

    $ psql -d db_ubikate -U db_admin -f resources/ways.sql

Connect to your database with psql or PgAdmin.

    psql -h localhost -U db_admin db_ubikate

Add the sorces and target columns to the table. 


    alter table ways add column "source" integer;
    alter table ways add column "target" integer;

Create the topology

    select pgr_createTopology('ways', 0.00000001, 'geom', 'gid');

Make sure that the columns added have indexes

    create index ways_source_idx on ways("source");
    create index ways_target_idx on ways("target"); 

## Install packages

    $ npm install

## Test the map

Start express services

    $ nodemon ./server.js

Start a simple HTTP server
   
    $ python -m SimpleHTTPServer

Open map.html

    http://0.0.0.0:8000/map.html


### Demos

 - [demo - map.html](https://drive.google.com/file/d/0B_2pVn70kRnbRkhtX1Ixc1JrWVk/view?usp=sharing)




       



