---
layout: post
title: Maven plugin
---

Maven plugins can be developed using a _MOJO_.

## What is MOJO?

**M**aven **O**ld **J**ava **O**bject abbreviated as _**MOJO**_. It is used to develop a maven plugin which helps in automating development tasks by attaching it to mavens build life cycle. Ah! this definition seems hard to understand right? Let me simplify, there were two jargons,

* Automating build tasks.
* Attach to mavens build life cycle.

### Automating build tasks:

When developing a project using spring and hibernate we will have to explicitly mention the location of spring bean xmls in web.xml and hibernate mapping files in hibernate configuration file. It often happens where we forget to add them when either of the new file is created. To make this a bit simpler, Spring framework provides us a class to be extended known as _XmlWebApplicatioContext_ and override a method known as _getDefaultConfigLocations()_ and this method ensures to read all the spring bean xmls and provide them to spring container. Similarly Hibernate also provides a class known as _LocalSessionFactoryBean_ to read all the hibernate mapping files. The drawback with these two approaches is we still have to place the files in a specific location and then this classes can start reading.

Why can't there be a automated task which will add all the spring bean xmls and hibernate mapping files in one respective text file and we just ask the spring framework to read this text file in order to load the beans or mapping files?

This automated task which is to read all the bean xmls and hibernate mapping files within a project and add them to a text file can be achieved by implementing a MOJO. We will learn how to implement a MOJO shortly.

### Attach to mavens build life cycle:

Once a MOJO is implemented we can use that as a build plugin in any project and attach it to a mavens build life cycle such as compile, test which would execute the plugin and perform the task of the plugin during this projects build process. 

Even before this whole gets murkier lets dive into learn how to implement a mojo and attach it to build life cycle of any project making it easy to understand.

### Implement a MOJO:

Implementing a MOJO is simply writing one class which would extend _AbstractMojo_ class override _execute()_. A sample MOJO looks something like this,

>
	@goal collect-hibernate-hbm-xmls
	@phase generate-resources
>	
	public class HBMXMLGathererMojo extends AbstractMojo {
>
	@parameter expression="${project.build.sourceDirectory}"
	@required
	private File sourceDirectory;
>	
	public void execute() throws MojoExecutionException {
	}	
>
	}

Once the MOJO is developed install the package into the local repository. Now attach this maven plugin to any project which has spring bean xmls and hibernate mapping files.

>
> 		<groupId>com.xlncinc</groupId>
> 		<artifactId>hbm-beanxml-gatherer</artifactId>
> 		<version>1.0-SNAPSHOT</version>
> 		<configuration>
> 		<springDirectory>src/main/resources</springDirectory>
> 		</configuration>
> 		<executions>
> 			<execution>
> 				<phase>generate-resources</phase>
> 				<goals>
> 					<goal>collect-hibernate-hbm-xmls</goal>
> 				</goals>
> 			</execution>
> 		</executions>

GroupId, ArtifactId and Version needs to be of the maven plugin that we created initially. Configuration element helps us to pass in parameters to the variable declared in a MOJO. It's important the variable name inside a MOJO to match with subchild of configuartion element.

This way a maven plugin helps us automate development tasks by attaching the plugin to maven build life cycle. I've implemented this in many of my projects and a sample code base can be found on my GitHub account. Below are the links to source code:

[Maven Plugin to gather spring beans and hibernate mappings](https://github.com/PrashanthAmbure/hbm-beanxml-gatherer)

[Project demonstrating the useage of maven plugin](https://github.com/PrashanthAmbure/springhbm-gatherer-demo)

[Guide to develop a Maven Plugin](https://maven.apache.org/guides/plugin/guide-java-plugin-development.html)