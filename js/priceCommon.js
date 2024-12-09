const nameMapping = {
    "Apple": "사과",
    "Dried Red Pepper": "건고추",
    "Potato": "감자",
    "Korean Pear": "배",
    "Garlic": "깐마늘(국산)",
    "Korean Radish": "무",
    "Lettuce": "상추",
    "Cabbage": "배추",
    "Onion": "양파",
    "Green Onion": "대파"
};
document.addEventListener("DOMContentLoaded", () => {
    // URL에서 productNo와 name 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const productNo = urlParams.get("productno");
    const productName = urlParams.get("name");
    const categoryCode = urlParams.get("category");

    if (!productNo || !productName || !categoryCode) {
        console.error("Missing productNo or name or code in URL Parameters");
        return;
    }

    // 영어 이름을 한국어 이름으로 변환
    const koreanProductName = nameMapping[productName];
    if (!koreanProductName) {
        console.error(`No mapping found for product name: ${productName}`);
        return;
    }

    // 제품명 설정
    document.querySelectorAll("#product-name").forEach(el => el.textContent = productName || "Unknown");

    fetchPredictions(koreanProductName);

    // 데이터를 저장할 변수
    let todayPrice = 0;
    let yesterdayPrice = 0;
    let aMonthAgoPrice = 0;
    let tenDaysAgoPrice = 0;

    // API 호출
    Promise.all([fetchPrice(productNo,categoryCode), fetchTenDaysAgoPrice(productNo)])
        .then(([priceData, tenDaysAgoData]) => {
            // fetchPrice 결과 처리
            if (priceData) {
                todayPrice = priceData.todayPrice;
                yesterdayPrice = priceData.yesterdayPrice;
                aMonthAgoPrice = priceData.aMonthAgoPrice;

                // HTML 업데이트
                document.querySelector(".today-price").textContent = `${todayPrice.toLocaleString()} won`;
                document.querySelector(".yesterday-price").textContent = `${yesterdayPrice.toLocaleString()} won`;
                document.querySelector(".price-a-month-ago").textContent = `${aMonthAgoPrice.toLocaleString()} won`;
            }

            // fetchTenDaysAgoPrice 결과 처리
            if (tenDaysAgoData) {
                tenDaysAgoPrice = tenDaysAgoData.tenDaysAgoPrice;

                // HTML 업데이트
                document.querySelector(".ten-days-ago-price").textContent = `${tenDaysAgoPrice.toLocaleString()} won`;
            }

            // Fluctuations 계산 및 업데이트
            updateFluctuations(todayPrice, yesterdayPrice, tenDaysAgoPrice, aMonthAgoPrice);
        })
        .catch(error => {
            console.error("API 호출 중 오류 발생:", error);
        });
});

// fetchPrice 함수: 당일, 하루 전, 한 달 전 가격 가져오기
function fetchPrice(productNo,categoryCode) {
    const oneDayAgoApiEndpoint = `url`;

    return fetch(oneDayAgoApiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("1일 전 데이터 API 호출 실패");
            }
            return response.json();
        })
        .then(data => {
            const items = data.price;
            const targetItem = items.find(item => item.productno === productNo && item.category_code === categoryCode);

            if (targetItem) {
                return {
                    todayPrice: parseInt(targetItem.dpr1.replace(/,/g, ""), 10) || 0,
                    yesterdayPrice: parseInt(targetItem.dpr2.replace(/,/g, ""), 10) || 0,
                    aMonthAgoPrice: parseInt(targetItem.dpr3.replace(/,/g, ""), 10) || 0
                };
            } else {
                console.error(`productno = ${productNo} 데이터를 찾을 수 없습니다.`);
                return null;
            }
        })
        .catch(error => {
            console.error("fetchPrice API 호출 중 오류 발생:", error);
            return null;
        });
}

// fetchTenDaysAgoPrice 함수: 10일 전 가격 가져오기
function fetchTenDaysAgoPrice(productNo) {
    const tenDaysAgoApiEndpoint = `http://localhost:3000/api?productno=${productNo}`; // 프록시 API 호출

    return fetch(tenDaysAgoApiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("10일 전 데이터 API 호출 실패");
            }
            return response.json();
        })
        .then(data => {
            const items = data.price;
            const year2024Item = items.find(item => item.yyyy === "2024");

            if (year2024Item) {
                return { tenDaysAgoPrice: parseInt(year2024Item.d10.replace(/,/g, ""), 10) || 0 };
            } else {
                console.error("2024년 데이터를 찾을 수 없습니다.");
                return null;
            }
        })
        .catch(error => {
            console.error("fetchTenDaysAgoPrice API 호출 중 오류 발생:", error);
            return null;
        });
}

// 변동 계산 및 업데이트 함수
function updateFluctuations(todayPrice, yesterdayPrice, tenDaysAgoPrice, aMonthAgoPrice) {
    // 변동 계산 함수
    function calculateFluctuation(basePrice, comparedPrice) {
        const fluctuation = basePrice - comparedPrice;

        if (fluctuation > 0) {
            return { text: `▲ ${fluctuation.toLocaleString()} won`, color: "red" }; // 상승
        } else if (fluctuation < 0) {
            return { text: `▼ ${Math.abs(fluctuation).toLocaleString()} won`, color: "blue" }; // 하락
        } else {
            return { text: `No Change`, color: "black" }; // 변동 없음
        }
    }

    // Fluctuations 업데이트
    const yesterdayResult = calculateFluctuation(todayPrice, yesterdayPrice);
    updateFluctuationElement("fluctuation-yesterday", yesterdayResult);

    const tenDaysAgoResult = calculateFluctuation(todayPrice, tenDaysAgoPrice);
    updateFluctuationElement("fluctuation-ten-days-ago", tenDaysAgoResult);

    const aMonthAgoResult = calculateFluctuation(todayPrice, aMonthAgoPrice);
    updateFluctuationElement("fluctuation-a-month-ago", aMonthAgoResult);
}

// Fluctuation 요소 업데이트 함수
function updateFluctuationElement(elementId, result) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = result.text;
        element.style.color = result.color;
    }
}

function fetchPredictions(koreanProductName) {
    const apiEndpoint = "http://localhost:8000/predict"; // API 엔드포인트

    fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: "2024-12-07" })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("API 호출 실패");
            }
            return response.json();
        })
        .then(data => {
            const predictions = data.predictions;

            // 특정 농산물 데이터 가져오기
            const productData = predictions[koreanProductName];

            if (!productData) {
                console.error(`No data found for product: ${koreanProductName}`);
                document.querySelector(".prediction-box:nth-child(1) p").innerHTML = "데이터 없음";
                document.querySelector(".prediction-box:nth-child(2) p").innerHTML = "데이터 없음";
                return;
            }

            // 예측 값 추출
            const nextDayPrice = productData.next_day.predicted_price || "N/A";
            const nextWeekPrice = productData.next_week.predicted_price || "N/A";
            console.log(nextDayPrice);
            console.log(nextWeekPrice);

            // HTML에 데이터 삽입
            document.querySelector(".prediction-box:nth-child(1) p").innerHTML = nextDayPrice;
            document.querySelector(".prediction-box:nth-child(2) p").innerHTML = nextWeekPrice;
        })
        .catch(error => {
            console.error("API 호출 중 오류 발생:", error);
            document.querySelector(".prediction-box:nth-child(1)").innerHTML = "오류 발생";
            document.querySelector(".prediction-box:nth-child(2)").innerHTML = "오류 발생";
        });
}