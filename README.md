# MadUp

2022.05.23 ~ 2022.05.26 (72시간) 

광고 관련 데이터를 받아 시각화하는 관리자 페이지입니다.
## Deploy


[배포 주소](https://stellar-platypus-819a1e.netlify.app/)

## Project Tree
```
📦src
 ┣ 📂components
 ┃ ┣ 📂ConsoleBar
 ┃ ┃ ┣ 📜consoleBar.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Dropdown
 ┃ ┃ ┣ 📜dropdown.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂NavBar
 ┃ ┃ ┣ 📂CloseNavBar
 ┃ ┃ ┃ ┣ 📜closeNavBar.module.scss
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂OpenNavBar
 ┃ ┃ ┃ ┣ 📜openNavBar.module.scss
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📜navBar.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂PageHeader
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜pageHeader.module.scss
 ┣ 📂routes
 ┃ ┣ 📂DashBoard
 ┃ ┃ ┣ 📂IntegratedAdManagement
 ┃ ┃ ┃ ┣ 📂IntegratedAdChart
 ┃ ┃ ┃ ┃ ┣ 📜integratedAdChart.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜adCalc.ts
 ┃ ┃ ┃ ┣ 📂IntegratedAdStatus
 ┃ ┃ ┃ ┃ ┣ 📜integratedAdStatus.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜status.ts
 ┃ ┃ ┃ ┣ 📂SelectDate
 ┃ ┃ ┃ ┃ ┣ 📜selectDate.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂StatusItem
 ┃ ┃ ┃ ┃ ┣ 📜statusItem.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜dashBoard.module.scss
 ┃ ┃ ┣ 📂MediaStatusBoard
 ┃ ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┣ 📜mediaStatusBoard.module.scss
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜chartStyle.ts
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜SearchPage.module.scss
 ┃ ┣ 📂Management
 ┃ ┃ ┣ 📂AdCards
 ┃ ┃ ┃ ┣ 📂AdCard
 ┃ ┃ ┃ ┃ ┣ 📂EditableBox
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜editable.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┗ 📜adCard.module.scss
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜adCards.module.scss
 ┃ ┃ ┃ ┗ 📜CardsSkeleton.tsx
 ┃ ┃ ┣ 📂AdsTop
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜adsTop.module.scss
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜SearchResultPage.module.scss
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜routes.module.scss
 ┣ 📂services
 ┃ ┗ 📜getData.ts
 ┣ 📂store
 ┃ ┗ 📜atoms.ts
 ┣ 📂styles
 ┃ ┣ 📂base
 ┃ ┃ ┣ 📜_fonts.scss
 ┃ ┃ ┣ 📜_more.scss
 ┃ ┃ ┗ 📜_reset.scss
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜_colors.scss
 ┃ ┃ ┗ 📜_levels.scss
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.scss
 ┣ 📂types
 ┃ ┣ 📜types.d.ts
 ┃ ┗ 📜ad.d.ts
 ┣ 📂utils
 ┃ ┗ 📜compactNumber.ts
 ┗ 📜index.tsx
```

## 화면 예시

### 통합 광고 현황

![image](https://user-images.githubusercontent.com/67466789/170403152-4e94a5a0-90b0-41fc-a7b6-eca4c6848385.png)

드롭다운을 통해 선택한 두 카테고리의 통합 값을 각각의 꺾은 선 그래프로 그려줍니다. 

### 매체 현황

![image](https://user-images.githubusercontent.com/67466789/170396478-8d91b60b-06ae-407e-9777-983389dd6f46.png)

미디어에 따른 광고 현황을 카테고리 별로 막대 그래프로 그려주고, 통합 수치를 테이블로 나타내줍니다. 

### 날짜 선택

![image](https://user-images.githubusercontent.com/67466789/170402995-f1c09650-33c1-4158-9e7d-611105eb3c55.png)

날짜의 범위를 선택하면 해당 날짜 범위의 통합 광고 현황과 매체 현황의 차트를 그려줍니다.

### 광고 관리

![image](https://user-images.githubusercontent.com/67466789/170396608-dbc37080-ab55-469c-9c05-92ee0a2c5f88.png)

- 관리 중인 전체 광고를 확인할 수 있고, 드롭다운을 통해 전체 광고, 진행중인 광고, 중단된 광고를 띄워줍니다.
- 광고 만들기 버튼을 클릭하면 새로운 매드업의 광고를 생성할 수 있습니다. 
- 수정하기 버튼을 클릭하면 광고의 상황과 일 희망 예상을 수정하고, 저장하기 버튼을 통해 수정된 광고를 저장할 수 있습니다. 
  - `EditableBox` 컴포넌트를 사용하여 수정 모드에서 클릭으로 각 요소가 유저 수정 가능 상태로 변경되도록 관리하였습니다.
- 메모이제이션을 통해 불필요한 재렌더링을 방지했습니다.
  - 광고 추가/수정 시에 해당 `AdCard`만 렌더링되고 전에 `AdCards`는 재렌더링되지 않습니다.
- `isLoading` 상태에 대한 Skeleton UI를 적용했습니다.

## Tech & Libraries

서버 및 API 통신 관련
- axios
- react-query

라우팅
- react-router-dom

스타일
- scss
- css module
- classnames

중앙 저장소
- recoil

코딩 컨벤션
- eslint
- prettier
- stylelint

기타
- victory: 차트 생성 라이브러리
- dayjs: 날짜, 시간 라이브러리
- react-datepicker: 달력 날짜 관리 라이브러리


## Contributors

- [김하늘](https://github.com/lazy-sky)
- [양한별](https://github.com/han-byul-yang)
- [이근영](https://github.com/Keunyeong) 
