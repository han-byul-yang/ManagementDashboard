# MadUp

2022.05.23 ~ 2022.05.26 (72시간) 

광고 관련 데이터를 받아 시각화하는 관리자 페이지입니다.
## Deploy


[배포 주소](https://stellar-platypus-819a1e.netlify.app/)

## Project Tree
```
📦src
 ┣ 📂assets
 ┃ ┗ 📂svgs
 ┃ ┃ ┣ 📜editting.svg
 ┃ ┃ ┣ 📜icon_down.svg
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜logo(90).svg
 ┃ ┃ ┣ 📜hamburger.svg
 ┃ ┃ ┣ 📜lightIcon.svg
 ┃ ┃ ┣ 📜alertIcon.svg
 ┃ ┃ ┣ 📜settingIcon.svg
 ┃ ┃ ┣ 📜avatarIcon.svg
 ┃ ┃ ┣ 📜dashboardIcon.svg
 ┃ ┃ ┣ 📜managementIcon.svg
 ┃ ┃ ┣ 📜arrowDown.svg
 ┃ ┃ ┣ 📜down-green.svg
 ┃ ┃ ┗ 📜up-red.svg
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
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜reportWebVitals.ts
```

## 화면 예시

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
