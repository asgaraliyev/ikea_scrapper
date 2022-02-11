const puppeteer = require("puppeteer");
const fs = require("fs");
const https = require("https");

// // File URL

// // Download the file

// function downloadFile(url) {
//   return new Promise((resolve, reject) => {
//     https
//       .get(url, (res) => {
//         // Open file in local filesystem
//         const file = fs.createWriteStream(`logo.png`);

//         // Write data into local file
//         res.pipe(file);

//         // Close the file
//         file.on("finish", () => {
//           file.close();
//           resolve();
//         });
//       })
//       .on("error", (err) => {
//         console.log("Error: ", err.message);
//         reject();
//       });
//   });
// }

// async function scrapePage({ page, pageNum = 1, allItemUrls = [] }) {
//   if (pageNum > 1) return allItemUrls;
//   await page.goto(`https://bina.az/items/all?page=${pageNum}`);
//   const result = await page.evaluate(function (allItemUrls) {
//     const items = document.querySelectorAll(".items_list .items-i .item_link");
//     for (let index = 0; index < items.length; index++) {
//       let href = items[index].getAttribute("href");
//       href = `https://bina.az/${href}`;
//       let params = location.href.split("?");
//       params = `?${params[1]}`;
//       let currentPage = parseInt(new URLSearchParams(params).get("page"));
//       allItemUrls.push({
//         href,
//         pageNum: currentPage,
//       });
//     }
//     return allItemUrls;
//   }, allItemUrls);
//   if (result.length) {
//     const nextBtn = await page.$("a[rel='next']");
//     await nextBtn.click();
//     await page.waitForNavigation({ waitUntil: "networkidle2" });
//     allItemUrls = [...result];
//     console.log(allItemUrls.length, allItemUrls[allItemUrls.length - 1]);
//     await scrapePage({
//       page,
//       pageNum: pageNum + 1,
//       allItemUrls,
//     });
//   } else {
//     console.log("next e clicklemedi");
//   }
//   return allItemUrls;
// }
// async function scrapeOnlyOne({ page, item }) {
//   await page.goto(item.href);
//   function getImages() {
//     const photos = document.querySelectorAll(
//       ".photos .thumbnails .thumbnail img"
//     );
//     const otherImageUrls = [];
//     for (let index = 0; index < photos.length; index++) {
//       otherImageUrls.push(photos[index].src);
//     }
//     const mainImageUrl = document.querySelector(".photos .thumbnail img")?.src;
//     return {
//       mainImageUrl,
//       otherImageUrls,
//     };
//   }
//   item.images = await page.evaluate(getImages);
//   item.title = await page.evaluate(() => {
//     return document.querySelector(".price_header .services-container h1")
//       .innerHTML;
//   });
//   item.parametrs = await page.evaluate(() => {
//     const parametrs = document.querySelector(
//       "div.item_show div.side table.parameters"
//     );
//     const trs = parametrs.querySelectorAll("tr");
//     const allParametrs = {};
//     for (let index = 0; index < trs.length; index++) {
//       allParametrs[trs[index].querySelectorAll("td")[0].innerHTML] =
//         trs[index].querySelectorAll("td")[1].innerHTML;
//     }
//     return allParametrs;
//   });
//   item.price = parseFloat(
//     await page.evaluate(() => {
//       return document.querySelector(
//         ".price_header section.price p.azn .price-val"
//       )?.innerHTML;
//     })
//   );
//   item.areas = await page.evaluate(() => {
//     const areasArr = [];
//     const aS = document.querySelectorAll(
//       "div.item_show div.side .badges_block ul.locations li a"
//     );
//     for (let index = 0; index < aS.length; index++) {
//       areasArr.push(aS[index]?.innerHTML);
//     }
//     return areasArr;
//   });
//   item.description = await page.evaluate(() => {
//     const arr = [];
//     const pS = document.querySelectorAll("div.item_show div.side article p");
//     for (let index = 0; index < pS.length; index++) {
//       arr.push(pS[index].innerHTML);
//     }
//     return arr;
//   });
//   item.dealer = await page.evaluate(() => {
//     const obj = {};
//     obj.name = document.querySelector(
//       "div.item_show .info .contacts .name"
//     )?.textContent;
//     obj.phone = document.querySelector(
//       "div.item_show .info .contacts .phone-container li"
//     )?.innerHTML;
//     return obj;
//   });
//   item.coordinates = await page.evaluate(() => {
//     const element = document.querySelector(
//       "#show_map .reveal-content #item_map"
//     );
//     return {
//       lat: parseFloat(element?.getAttribute("data-lat")),
//       lng: parseFloat(element?.getAttribute("data-lng")),
//     };
//   });
//   return item;
// }
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     devtools: true,
//     args: [
//       "--start-maximized", // you can also use '--start-fullscreen'
//     ],
//   });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1366, height: 768 });
//   // const item = {
//   //   url: "https://bina.az/items/2406874",
//   //   pageNum: 1,
//   // };

//   // await scrapeOnlyOne({ page, item });
//   // console.log(item);
//   const allUrls = await scrapePage({ page });
//   for (let index = 0; index < allUrls.length; index++) {
//     for (let altIndex = 0; altIndex < allUrls.length; altIndex++) {
//       if (altIndex !== index) {
//         if (allUrls[altIndex].href == allUrls[index]) {
//           console.log("beraberlik tapildi", allUrls[altIndex].href);
//           delete allUrls[index];
//         }
//       }
//     }
//   }
//   for (let index = 0; index < allUrls.length; index++) {
//     await scrapeOnlyOne({ page, item: allUrls[index] });
//   }
// })();
function sleep(ms){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },ms)
  })  
}
(async function () {
  const products = [
    "803.889.31",
    "203.647.30",
    "802.458.76",
    "002.458.80",
    "604.729.83",
    "104.285.39",
    "104.285.63",
    "203.889.29",
    "702.903.60",
    "103.597.91",
    "103.848.99",
    "304.095.06",
    "503.849.01",
    "804.838.10",
    "304.837.99",
    "303.828.42",
    "803.797.38",
    "403.623.01",
    "803.756.36",
    "604.653.98",
    "502.632.30",
    "604.400.39",
    "204.767.61",
    "902.074.02",
    "903.734.63",
    "703.726.62",
    "303.658.71",
    "103.658.72",
    "903.658.73",
    "204.269.31",
    "504.497.52",
    "701.760.86",
    "103.787.56",
    "403.849.73",
    "603.605.51",
    "203.610.05",
    "503.606.17",
    "803.720.39",
    "102.586.69",
    "602.400.35",
    "103.378.17",
    "803.210.21",
    "502.400.31",
    "103.748.95",
    "003.621.19",
    "704.811.71",
    "404.666.00",
    "104.159.71",
    "803.637.04",
    "304.801.78",
    "204.801.69",
    "869.988.59",
    "869.988.59",
    "869.988.59",
    "869.998.85",
    "403,695,57",
    "803.689.71",
    
  ];
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    args: [
      "--start-maximized", // you can also use '--start-fullscreen'
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  const scrapedProducts=[]
  for (let index = 0; index < products.length; index++) {
  await page.goto("https://www.google.com/");

    await page.evaluate((product) => {
      document.querySelector(
        ".gLFyf"
      ).value = `"${product}" site:www.ikea.com/ru | ikea.com.tr`;
    },products[index]);
    await page.keyboard.press("Enter");
    await page.waitForResponse((response) => {
      console.log(response)
      return response.url().startsWith(`https://github.com/search/count?p=${pageNum}`) && response.status() === 200;
     });
    const link=await page.evaluate(()=>{
      const listItem=document.querySelectorAll(".tF2Cxc")
      const link=listItem[0].querySelector(".yuRUbf").querySelector("a").getAttribute("href")
      return link
    })
    if(!link.includes(".com/ru/ru")){
      continue
    }
    if(link.includes(".pdf")){
      continue
    }
    await page.goto(link)
    await page.waitForSelector('.range-revamp-header-section__description')
    const obj={}
    obj.title=await page.evaluate(()=>{
      return document.querySelector(".range-revamp-header-section__title--big").textContent
    })
    obj.desctiption=await page.evaluate(()=>{
      return document.querySelector(".range-revamp-header-section__description").textContent
    })
    obj.URL=link
    
    obj.options=await page.evaluate(()=>{
      const options=document.querySelectorAll(".range-revamp-product-dimensions__measurement-wrapper")
      const obj={}
      for (let index = 0; index < options.length; index++) {
          const fieldName=options[index].querySelector(".range-revamp-product-dimensions__measurement-name").textContent;
          const fieldValue=options[index].textContent
          obj[fieldName]=fieldValue
      }
      return obj
    })
    obj.images=await page.evaluate(()=>{
      const images=document.querySelectorAll(".range-revamp-product__left-top .product-detail .thumbnail .owl-item .item")
      const imageURLS=[]
      for (let index = 0; index < images.length; index++) {
          imageURLS.push(images[index].querySelector("img").getAttribute("src"))
      }
      const image=document.querySelector(".range-revamp-product__left-top .range-revamp-media-grid__media-container").querySelector("img").getAttribute("src")
      imageURLS.push(image)
      const additionalImagesEl=document.querySelectorAll(`.range-revamp-product__left-top .range-revamp-aspect-ratio-image[class*="--square"]`)
      for (let index = 0; index < additionalImagesEl.length; index++) {
        const imageSrc=additionalImagesEl[index].querySelector("img").getAttribute("src")
        imageURLS.push(imageSrc)      
      }
      return imageURLS
    })
    console.log(obj)
    scrapedProducts.push(obj)
  }
  console.log("bitdi",scrapedProducts,"bitdi")

})();
