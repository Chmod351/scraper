web Scraping

# What is Web Scraping??:
 Suppose you want some information from a website? Let’s say a paragraph on Donald Trump! What do you do? Well, you can copy and paste the information from Wikipedia to your own file. But what if you want to get large amounts of information from a website as quickly as possible? Such as large amounts of data from a website to train a Machine Learning algorithm? In such a situation, copying and pasting will not work! And that’s when you’ll need to use Web Scraping


===================================================================================
## How use it? :

Go to [SwaggerUI](https://scraper-5ask.onrender.com/api/docs)

- Then, go to your target webpage.
- right click on the title and select `Inspect` . You will see something like this
![image](https://user-images.githubusercontent.com/88646148/224133149-05f13b38-47d0-4991-bad9-703768492fae.png)
- Then select the CSS class
![image](https://user-images.githubusercontent.com/88646148/224134329-83ecf54e-08ce-415e-b3c0-cc93f258d51d.png)

- And use your keyWord to filter results, your json would be something like
```
{
      "url":"https://www.lanacion.com.ar/",
      "objectClass":".com-link",
      "keyWord":"asdadsadsasd"
}
```
- If you dont use any keyword, the scrapper will return the whole page
- The scrapper does not store any data /information in any db or cache.

### Demo
[Screencast from 2023-03-09 15-10-08.webm](https://user-images.githubusercontent.com/88646148/224118566-6d248f0c-f59e-411e-bfad-a6a36b4051a2.webm)

## Endpoint Response:
-  https://scraper-5ask.onrender.com/api/scrape
-  The petitions must be  POST request

# This project was tested by 
- jest

```
npx jest
```

# Contributions
-  Clone Repo
```
git clone https://github.com/yamilt351/scrape
```
- Make your changes
- Test your changes 
- Document your changes
- create your pull request with evidences

# Licence
- GPLv3

===================================================================================
