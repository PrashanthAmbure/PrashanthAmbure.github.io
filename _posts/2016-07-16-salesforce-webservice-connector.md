---
layout: post
title: Salesforce Web Services connector from Java
---

The intent of this blog is to understand the concept of accessing your own Salesforce org's information programmatically. To use this blog one should be familiar with SOAP and RESTFul WebServices. Salesforce provides different API's for different needs of accessing your salesforce org's details. In this blog we will learn how to use SOAP API as this stands the foundation for the rest web services.

# SOAP API

To retrieve, update or delete records, such as `ACCOUNT` object. Any language that supports WebServices can help us to perform this operation. I've a sample java program implemented in which uses SOAP API to perform standard CRUD opertaions on _**ACCOUNT**_ object. Please follow the below steps.

## Prepare to integrate JAVA app with SOAP API.

1. Generate and download WSDLs.
2. Download the WSC(**W**eb**S**ervices**C**onnector) jar
3. Implement client side java code.

### Step 1: Generate and download WSDLs

To get your org-specific WSDLs, log into your organization and then click _Your Name >> Setup >> App Setup >> Develop >> API_. We need three WSDLs:

* the enterprise WSDL (unique to your organization)
* the partner WSDL (generic)
* the Metadata WSDL

Save each WSDL to a directory on your computer.

### Step 2: Download and build the WSC JAR

WSC is an open-source project maintained [at github](https://github.com/forcedotcom/wsc). Follow the instructions in the repo to clone or download the project and clean it. This will get you a working jar file. You can also execute the following instructions in your Terminal or Command Prompt window.

* git clone https://github.com/forcedotcom/wsc.git
* mvn clean package -Dgpg.skip

You can now find the _WSC_ jar inside `target` folder of the cloned project.

### Step 3: Generate Client-Side Java Code

Now return to your Terminal or Command Prompt window, change your working directory to the location where you downloaded the files in previous steps including the wsc jar, and then generate stub client code as follows.

To generate the enterprise, partner and metadata client JARs, run the following command with the enterprise WSDL you downloaded from your organization.

> java -classpath wsc-XX.jar com.sforce.ws.tools.wsdlc enterprise.wsdl enterprise.jar
>
> java -classpath wsc-XX.jar com.sforce.ws.tools.wsdlc partner.wsdl partner.jar
>
> java -classpath wsc-XX.jar com.sforce.ws.tools.wsdlc metadata.wsdl metadata.jar

Now that our environment is ready to go, open Eclipse...

1. Create a new Java project named “WSC - Enterprise” (click File >> New >> Java Project).
2. Add the wsc-XX.jar and enterprise.jar to the project (click _Project >> Properties >> Java Build Path >> Libraries or External Libraries, then add the JARs to the project_).
3. Add a new folder, wsc, to the src folder in your app (right-click src in Package Explorer, then click _New >> Folder_).
4. Create a new class src/wsc/Main.java and paste in the code from [here](https://github.com/PrashanthAmbure/salesforce-wsc-SOAP).



