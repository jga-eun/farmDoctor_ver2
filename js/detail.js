// category.html에 있는 항목들을 위한 데이터
// 각 농산물의 이름, 이미지, 설명, 효능, 주산지, 요리 정보를 포함
const category1Data = {
    "Apple": {
      name: "Apple",
      image: "img/apple.jpg",
      description: "A representative fruit known for its sweet and crisp taste. More nutritious when eaten with the skin, and can be eaten raw or used in various dishes.",
      benefits: "Rich in pectin fiber which is good for gut health, and contains quercetin which has antioxidant effects. Also helps with diet by providing a feeling of fullness.",
      productionAreas: "Andong (Gyeongbuk), Yeongju (Gyeongbuk), Jecheon (Chungbuk)",
      dishes: "Apple pie, apple jam, apple juice"
    },
    "Dried Red Pepper": {
      name: "Dried Red Pepper",
      image: "img/dried-red-pepper.jpg",
      description: "Dried red peppers, a representative spice that provides spiciness. Ground into powder and used in various dishes.",
      benefits: "Contains capsaicin which promotes metabolism and is rich in vitamin C. Also has antioxidant effects and helps improve blood circulation.",
      productionAreas: "Goesan (Chungbuk), Goheung (Jeollanam-do), Cheongsong (Gyeongbuk)",
      dishes: "Red pepper paste, kimchi, fried red pepper, spicy fish soup, red pepper crisps"
    },
    "Garlic": {
      name: "Garlic",
      image: "img/garlic.jpg",
      description: "A spice known for its strong aroma and spicy taste. Can be eaten raw or roasted, and used as seasoning in various dishes.",
      benefits: "Rich in allicin which has antibacterial and anti-cancer effects, helps with blood circulation and strengthens immunity. Also effective for fatigue recovery.",
      productionAreas: "Namhae (Gyeongnam), Uiseong (Gyeongbuk), Jeju Island",
      dishes: "Stir-fried garlic stems, pickled garlic, garlic bread, garlic chicken, seasoned garlic stems"
    },
    "Green Onion": {
      name: "Green Onion",
      image: "img/green-onion.jpg",
      description: "A vegetable with a distinctive flavor and strong taste, mainly used as seasoning or garnish. Both white and green parts are used in cooking.",
      benefits: "Rich in allicin which has antibacterial properties and good for cold prevention, abundant in vitamins A and C. Also helps improve blood circulation.",
      productionAreas: "Icheon (Gyeonggi-do), Jincheon (Chungbuk), Miryang (Gyeongnam)",
      dishes: "Green onion pancake, green onion kimchi, shredded green onion"
    },
    "Korean Pear": {
      name: "Korean Pear",
      image: "img/korean-pear.jpg",
      description: "A fruit known for its juicy and sweet taste. Has a soft texture and subtle fragrance, usually eaten fresh.",
      benefits: "Effective for cough and phlegm, rich in water and dietary fiber which helps prevent constipation. Also helps with fatigue recovery and hangover relief.",
      productionAreas: "Naju (Chungnam), Pyeongtaek (Gyeonggi-do), Gimcheon (Gyeongbuk)",
      dishes: "Steamed pear, pear jam"
    },
    "Korean Radish": {
      name: "Korean Radish",
      image: "img/korean-radish.jpg",
      description: "A root vegetable known for its cool and crisp taste. Used as a main ingredient in kimchi and often eaten raw.",
      benefits: "Contains diastase enzyme which aids digestion and is good for indigestion, rich in vitamin C. Also effective for fever reduction and cold prevention.",
      productionAreas: "Jeju Island, Taebaek (Gangwon-do), Goesan (Chungbuk)",
      dishes: "Radish kimchi, radish soup, radish salad, dried radish, braised mackerel with radish"
    }
  };
  
  // category2.html
  const category2Data = {
    "Lettuce": {
      name: "Lettuce",
      image: "img/lettuce.jpg",
      description: "A representative leafy vegetable known for its cool and crisp texture. Commonly used as a wrapping vegetable and popular in salads.",
      benefits: "Rich in vitamins A and K, and high in dietary fiber which helps prevent constipation. Also rich in iron which helps prevent anemia.",
      productionAreas: "Pyeongtaek (Gyeonggi-do), Asan (Chungnam), Cheongju (Chungbuk)",
      dishes: "Lettuce salad, fresh lettuce with sauce"
    },
    "Napa Cabbage": {
      name: "Napa Cabbage",
      image: "img/napa-cabbage.jpg",
      description: "A representative Korean vegetable and the main ingredient in kimchi. Known for its soft texture and sweet taste, it can also be eaten raw.",
      benefits: "Rich in vitamin C and calcium, and high in dietary fiber which is good for gut health. Also rich in antioxidants which help boost immunity.",
      productionAreas: "Gochang (Jeollabuk-do), Taean (Chungnam), Pyeongchang (Gangwon-do)",
      dishes: "Kimchi, millefeuille hot pot, cabbage wraps, cabbage pancake, soybean paste soup with cabbage"
    },
    "Onion": {
      name: "Onion",
      image: "img/onion.jpg",
      description: "A root vegetable with a spicy taste, commonly used as a spice and cooking ingredient. When peeled, it has a distinctive pungent aroma and can be eaten raw or stir-fried in cooking.",
      benefits: "Rich in quercetin, an antioxidant that helps improve blood circulation and has anti-inflammatory effects. It also helps control blood sugar and is rich in vitamin C and dietary fiber.",
      productionAreas: "Changnyeong (Gyeongnam), Muan (Jeollanam-do), Jeju Island",
      dishes: "Fried onion, stir-fried onion, French onion soup"
    },
    "Potato": {
      name: "Potato",
      image: "img/potato.jpg",
      description: "A famine relief crop known for its soft and sweet taste. Can be boiled or fried, and used in various dishes.",
      benefits: "Rich in vitamin C and potassium which helps control blood pressure. Also rich in dietary fiber which helps prevent constipation.",
      productionAreas: "Pyeongchang (Gangwon-do), Gangneung (Gangwon-do), Bonghwa (Gyeongbuk)",
      dishes: "Potato pancake, braised potato, potato soup, french fries, potato soup"
    }
  };
  
/**
 * 현재 페이지에 따라 적절한 카테고리 데이터를 반환하는 함수
 * @returns {Object} 현재 페이지에 해당하는 농산물 데이터 객체
 */
function getProductData() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('category2.html')) {
      return category2Data;
    }
    return category1Data;
  }
  
  /**
   * 상세 페이지의 내용을 선택된 농산물 정보로 업데이트하는 함수
   * @param {string} productName - 선택된 농산물의 이름
   */
  function updateDetailPage(productName) {
    const allProductData = {...category1Data, ...category2Data};
    const product = allProductData[productName];
    if (!product) return;
  
    // 헤더 제목 
    const headerElement = document.querySelector('.header1');
    if (headerElement) {
        headerElement.textContent = `[ ${product.name} ]`;
    }
  
    // 농산물 이미지 
    const imageElement = document.querySelector('.section1 img');
    if (imageElement) {
      imageElement.src = product.image;
      imageElement.alt = product.name;
    }
  
    // // 농산물 이름
    // const nameElement = document.querySelector('.p-name');
    // if (nameElement) {
    //   nameElement.textContent = `[${product.name}]`;
    // } 이미 header에 농산물 이름 있어서 지웠음
  
    // 소개 
    const descElement = document.querySelector('.content1');
    if (descElement) {
      descElement.textContent = product.description;
    }
  
    // 효능 
    const benefitsElement = document.querySelector('.content2');
    if (benefitsElement) {
      benefitsElement.textContent = `Benefits: ${product.benefits}`;
    }
  
    // 주산지
    const areasElement = document.querySelector('.content3');
    if (areasElement) {
      areasElement.textContent = `Major Production Areas: ${product.productionAreas}`;
    }
  
    // 활용 요리
    const dishesElement = document.querySelector('.content4');
    if (dishesElement) {
      dishesElement.textContent = `Dishes: ${product.dishes}`;
    }
  }
  
  // DOM이 로드되면 실행되는 초기화 함수
document.addEventListener('DOMContentLoaded', () => {
  const categoryItems = document.querySelectorAll('.section1');
  const currentData = getProductData();

  // 카테고리 항목에 클릭 이벤트 추가
  categoryItems.forEach(item => {
      item.addEventListener('click', (event) => {
          const productName = event.target.textContent.trim();
          if (currentData[productName]) {
              // 선택된 농산물 정보 저장 및 페이지 이동
              localStorage.setItem('selectedProduct', productName);
              window.location.href = 'detail.html';
          }
      });
  });

  // detail.html 페이지인 경우 내용 업데이트
  if (window.location.pathname.includes('detail.html')) {
      const selectedProduct = localStorage.getItem('selectedProduct');
      if (selectedProduct) {
          updateDetailPage(selectedProduct);
          setupGoToPriceButton(selectedProduct); // 버튼 설정 추가
          localStorage.removeItem('selectedProduct');
      }
  }
});
/**
 * Go to Price 버튼 관련 함수
 * @param {string} productName - 선택된 농산물 이름
 */
function setupGoToPriceButton(productName) {
  const goToPriceBtn = document.getElementById('goToPriceBtn');
  if (goToPriceBtn) {
      goToPriceBtn.addEventListener('click', () => {
          // 농산물 이름에 맞는 페이지로 이동
          const productPage = `${productName.toLowerCase().replace(/\s+/g, '-')}-price.html`;
          window.location.href = productPage;
      });
  }
}
//이부분입니다 !!!!! price 페이지에 맞게 수정하거나 이 페이지에 맞게 수정할 부분.. 지금은 카테고리 버튼에 맞게 이동하게끔 되어 있어요 ex) category에서 apple 누르면 apple 세부사항 뜨고 go to price 누르면 apple-price.html로 이동