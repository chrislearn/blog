---
title: Ubuntu 15.04 上安装最新版本 mongodb
author: chrislearn young
type: post
date: 2015-07-02T07:43:46+00:00
categories:
  - Linux
tags:
  - mongodb
  - Ubuntu

---
<div class="sequence-block">
  <div class="bullet-block">
    <div class="sequence-step">
      1
    </div>
  </div>
  
  <div id="import-the-public-key-used-by-the-package-management-system" class="section">
    <h3>
      Import the public key used by the package management system.
    </h3>
    
    <p>
      The Ubuntu package management tools (i.e. <tt class="docutils literal"><span class="pre">dpkg</span></tt> and <tt class="docutils literal"><span class="pre">apt</span></tt>) ensure package consistency and authenticity by requiring that distributors sign packages with GPG keys. Issue the following command to import the <a class="reference external" href="https://docs.mongodb.org/10gen-gpg-key.asc">MongoDB public GPG Key</a>:
    </p>
    
    <div class="highlight-sh">
      <div class="highlight">
        <pre>sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
</pre>
      </div>
    </div>
  </div>
</div>

<div class="sequence-block">
  <div class="bullet-block">
    <div class="sequence-step">
      2
    </div>
  </div>
  
  <div id="create-a-list-file-for-mongodb" class="section">
    <h3>
      Create a list file for MongoDB.
    </h3>
    
    <p>
      Create the <tt class="docutils literal"><span class="pre">/etc/apt/sources.list.d/mongodb-org-3.0.list</span></tt> list file using the following command:
    </p>
    
    <div class="highlight-sh">
      <div class="highlight">
        <pre>echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list</pre>
      </div>
    </div>
  </div>
</div>

<div class="sequence-block">
  <div class="bullet-block">
    <div class="sequence-step">
      3
    </div>
  </div>
  
  <div id="reload-local-package-database" class="section">
    <h3>
      Reload local package database.
    </h3>
    
    <p>
      Issue the following command to reload the local package database:
    </p>
    
    <div class="highlight-sh">
      <div class="highlight">
        <pre>sudo apt-get update
</pre>
      </div>
    </div>
  </div>
</div>

<div class="sequence-block">
  <div class="bullet-block">
    <div class="sequence-step">
      4
    </div>
  </div>
  
  <div id="install-the-mongodb-packages" class="section">
    <h3>
      Install the MongoDB packages.
    </h3>
    
    <p>
      You can install either the latest stable version of MongoDB or a specific version of MongoDB.
    </p>
    
    <div id="install-the-latest-stable-version-of-mongodb" class="section">
      <h4>
        Install the latest stable version of MongoDB.
      </h4>
      
      <p>
        Issue the following command:
      </p>
      
      <div class="highlight-sh">
        <div class="highlight">
          <pre>sudo apt-get install -y mongodb-org</pre>
        </div>
      </div>
    </div>
  </div>
</div>