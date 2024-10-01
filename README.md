# 프로젝트 제목: MediaMate

[배포된 사이트 바로가기](https://next-media-mate.vercel.app/)

![image](https://github.com/user-attachments/assets/c50ee9d3-a645-42c1-a3c8-1ce1fa7ba66b)

## 프로젝트 소개

### 프로젝트 배경

- 영화 산업은 빠르게 변화하고 있으며, 다양한 플랫폼에서 구독 서비스를 이용하여 영화나 Tv 프로그램을 시청할 수 있습니다.

- 현대 영화 플랫폼은 방대한 영화 데이터를 다루지만, 과도한 정보와 복잡한 인터페이스로 인해 사용자가 원하는 정보를 빠르게 찾기 어려운 경우가 많습니다. 이에 따라, The Movie Database (TMDB) API를 활용하여 사용자에게 최신 영화 정보를 제공하는 동시에, 인기 영화, 현재 상영 중인 영화, 개봉 예정 영화, 높은 평점 영화라는 네 가지 카테고리로 명확하게 분리하여 사용자 경험을 개선하고자 했습니다.

## 프로젝트 목표

- **최신 영화 정보 제공**: TMDB API와의 연동을 통해 실시간으로 업데이트되는 최신 영화 데이터를 사용자에게 제공합니다.

- **개인 검색 기능**: 사용자가 영화나 Tv 프로그램을 검색하여 관련 콘텐츠를 제공합니다.

- **좋아요 및 평가 기능**: 사용자가 원하는 콘텐츠를 자신의 좋아요 목록에 추가하고 평가할 수 있습니다.

- **사용자 중심 디자인**: 간결하고 직관적인 사용자 인터페이스를 통해 모든 연령대의 사용자들이 쉽게 사이트를 이용할 수 있도록 제작했습니다.

## 개발 인원 및 개발 기간

- 개발 인원 : 1명

- 개발 기간 : 2024.08.01 ~ 2024.09.01

## 기술 스택

### ✔️ Environment

<img src="https://img.shields.io/badge/visualstudio-297ACC?style=for-the-badge&logo=visualstudio&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github&logoColor=white">

### ✔️ Develpoment

<img src="https://img.shields.io/badge/zustand-2D3748?style=for-the-badge&logo=zustand&logoColor=black"> <img src="https://img.shields.io/badge/typescript-2F74C0?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind css-white?style=for-the-badge&logo=tailwindcss&logoColor=#06B6D4">

### ✔️ Deploy

<img src="https://img.shields.io/badge/vercel-2D3748?style=for-the-badge&logo=vercel&logoColor=black">

## 주요 기능

### 현재 구현된 기능 목록

- 영화 카테고리 분류: 인기 영화, 현재 상영 중, 개봉 예정, 높은 평점 네 가지 카테고리로 영화 목록을 구분하여 사용자들이 손쉽게 영화를 탐색할 수 있도록 구현.

- 상세 정보 제공: 각 영화나 Tv 프로그램에 대한 줄거리 및, 출연진 , 평점 등 상세한 정보 제공.

- 반응형 웹 디자인: 모바일 및 데스크톱 환경에서 모두 최적화된 UI 제공.

- 검색 기능: 키워드로 영화 및 Tv 프로그램 검색 가능.

- 좋아요 및 평가 기능: 자신이 좋아하는 콘텐츠를 좋아요 목록에 추가하거나 평가 가능.

### 추가할 기능 목록

- 소셜 공유 기능: 특정 콘텐츠를 소셜 미디어를 통해 공유할 수 있는 기능.

- Tv 프로그램 좋아요 기능

### 추가할 페이지

- 좋아요 목록 페이지

- 평가한 콘텐츠 목록 페이지

## 화면 구성

### 영화 상세페이지

![0928영화](https://github.com/user-attachments/assets/27c32b74-7ccf-44de-8701-6484c1a06e9f)

- 영화 포스터: 시각적으로 영화 포스터를 통해 영화의 첫 인상을 전달

- 줄거리 요약: 영화의 주요 줄거리를 간략하게 설명하여 사용자가 내용을 빠르게 이해 가능

- 출연진 및 감독 정보: 주요 출연진과 감독의 정보를 제공하여 영화에 대한 배경을 추가

- 좋아요 및 평가 기능: 좋아요 및 평가 가능

### 인물 페이지

![0928사람](https://github.com/user-attachments/assets/9e810028-30bf-4269-bdaa-e12339d38932)

- 인물 포스터: 인물의 포스터를 통해 이름은 몰랐지만 아는 배우인지 확인할 수 있습니다. 포스터는 해당 인물의 첫 인상을 전달하며, 시청자의 기억에 남을 수 있도록 돕습니다.

- 출생지 및 생일: 출생지는 해당 인물의 출신 지역을 나타내며, 생일은 이 인물이 어떤 시기에 활동하고 있는지를 알 수 있는 중요한 정보입니다. 이러한 정보는 팬들이 인물에 대한 배경 지식을 더욱 깊게 이해할 수 있게 합니다.

- 약력: 이 섹션에서는 해당 인물의 주요 경력, 대표작, 수상 이력 등을 소개합니다.

### 검색 기능

![0928search](https://github.com/user-attachments/assets/e01d0155-4138-4ebe-a1f6-8f522269cf71)

- 사용자가 영화 및 TV 프로그램을 검색할 수 있는 기능을 제공합니다. 검색창에 텍스트를 입력하면 실시간으로 검색어가 적용되어 결과를 필터링할 수 있으며, use-debounce를 통해 검색어 입력이 일정 시간 동안 지연된 후에 처리됩니다.

### 반응형 홈페이지 및 상세 페이지

- 이 웹사이트는 다양한 기기에서 최적화된 경험을 제공하기 위해 반응형 디자인을 적용했습니다. 1024px 이하의 화면 크기에서는 상단에 메뉴바가 나타나며, 클릭을 통해 페이지를 탐색할 수 있습니다. 이를 통해 모바일 및 태블릿 사용자들도 원활하게 콘텐츠를 탐색할 수 있습니다.

![반응형](https://github.com/user-attachments/assets/9a9b6fc3-aa7a-43f1-ac1e-0fc773ff319b)
![반응형11](https://github.com/user-attachments/assets/f13f9056-56ce-4d91-a63c-6bd18b63f61a)

### 반응형 인물 페이지

![반응형인물](https://github.com/user-attachments/assets/1bee3737-af0b-40cc-becb-dc7008c45095)

- 인물 페이지 역시 반응형으로 구현되어, 화면 크기에 상관없이 인물 정보를 쉽게 확인할 수 있도록 설계되었습니다. 작은 화면에서도 사용자 경험을 저해하지 않고, 생년월일, 출생지, 약력 등 중요한 정보가 한눈에 들어오도록 배치하였습니다.

## 아키텍처

![image](https://github.com/user-attachments/assets/060a8104-0ab9-46d4-b140-cdf232c7d24d)
MediaMate 프로젝트는 Next.js를 기반으로 Zustand로 상태 관리를 하며, TMDB API를 사용하여 실시간 영화, Tv 프로그램 데이터를 제공하는 구조로 설계되었습니다.

1. 프론트엔드: Next.js를 사용해 서버 사이드 렌더링(SSR)을 활용하여 빠른 페이지 로딩을 구현했습니다. Tailwind CSS를 적용하여 반응형 웹 디자인을 지원하고, 사용자 친화적인 UI/UX를 제공합니다.

2. API 연동:
   TMDB API와의 통신을 통해 최신 영화 데이터, 인기 영화, 개봉 예정 영화 등의 정보를 실시간으로 받아옵니다. 이를 통해 사용자에게 최신 콘텐츠를 제공합니다.

[로그인 처리 관련 블로그 글](https://velog.io/@white0_0/Next.js%EC%98%81%ED%99%94-%EB%B0%8F-Tv-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-TMDB-API-1%ED%83%84%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84)
