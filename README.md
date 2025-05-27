# AdminPageNurse

Administration page for Message Nurse System

DISCLAIMER: "this work was part of the end project for the IoT specialist diploma of UBA, in order to run it is needed, you mus install dependencies with --legacy-peer-deps, and after that audit fix.
The repository owner makes no warranties or guarantees regarding the accuracy, completeness, or usefulness of the information provided. The user is solely responsible for any risks associated with using the repository's contents. Any use of the software or documentation is at the user's own risk."

## Overall system description

This web page is part of a system that includes a mobile messaging application, a MQTT broker and a backend server.

![./doc/system-diagram.png](./doc/system-diagram.png)

## Technologies used

The page was developed using Ionic/angular. Some libraries that were used are:

* Rsup-MQTT: simple wrapper for MQTT clients([https://www.npmjs.com/package/rsup-mqtt]( https://www.npmjs.com/package/rsup-mqtt )).
* HighCharts: used for data visualization([https://www.npmjs.com/package/highcharts](https://www.npmjs.com/package/highcharts)).

In order to launch  the webpage in debug mode, the system must be running the backend server ([https://github.com/gustavobastian/ServerNurse](https://github.com/gustavobastian/ServerNurse)), and then run:

```\
npm install --legacy-peer-deps
ionic serve
```

If you want to build the site:

```\
ionic build --production
```

## Page navigation

The web page is a simple dashboard, were the administrator can monitoring the system status, add/delete/update users, add/delete/update patients, create and delete scheduled jobs, add/delete/update beds information, look at the events log , add news specialization to the treatment table and look for statistics of the system.

### Landing page

![./doc/pages/fig1.png](./doc/pages/fig1.png)

### Login page

![./doc/pages/fig2.png](./doc/pages/fig2.png)

### MQTT config page

![./doc/pages/fig3.png](./doc/pages/fig3.png)

### Event logs  page

![./doc/pages/fig10.png](./doc/pages/fig10.png)

### Monitoring page

In this page the administrator can view the current status of the beds or the users.

![./doc/pages/fig5.png](./doc/pages/fig5.png)
![./doc/pages/fig6.png](./doc/pages/fig6.png)

### Nurse specializations page

In this page the administrator can store a new specialization in the database.

![./doc/pages/fig4.png](./doc/pages/fig4.png)

### Users editing page

In this page, the administrator can create, update or delete users.

![./doc/pages/fig11.png](./doc/pages/fig11.png)

### Patients editing page

In this page, the administrator can create, update or delete users.

![./doc/pages/fig12.png](./doc/pages/fig12.png)

### Scheduling a task page

In this page, the administrator can create or delete task for a patient. The tasks could be daily, weekly or montly. They will be stored in the backend database.

![./doc/pages/fig13.png](./doc/pages/fig13.png)

### Nurse and patients statistics page

![./doc/pages/fig7.png](./doc/pages/fig7.png)
![./doc/pages/fig8.png](./doc/pages/fig8.png)
![./doc/pages/fig9.png](./doc/pages/fig9.png)
