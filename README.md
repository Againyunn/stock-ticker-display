# 연합인포맥스 대외 전광판 관리

## 1. 주요 프로젝트 구조

```
src/
├── app
│   ├── display
│   │   └── [item]
│   │       └── page.tsx     # 도메인별 전광판 접속 url 및 페이지
│   ├── layout.tsx           # 공통 레이아웃
│   ├── manage
│   │   └── page.tsx         # 관리 페이지(필요 시 작업)
│   └── page.tsx             # 본 서비스에서 관리하는 전광판 리스트업
├── assets                   # 정적 리소스
├── atom                     # 단순 ui 컴포넌트
│   └── ...
├── components               # 동적, 상태 값 관리 등 덩어리가 목적을 가진 큰 컴포넌트
│   └── ...
├── config
│   └── domains.ts           # 각 도메인별 전광판 정보 관리
├── domains                  # 각 도메인별 실질적인 전광판 소스코드 및 컴포넌트
│   └── wooribank
│       └── Display.tsx      # 각 도메인별 web에 보여질 실질적인 전광판
├── hooks
├── lib
├── middleware
├── pages
├── services
├── stores
├── styles
│   └── globals.css
├── types
│   └── domain.ts
└── utils
```

## 2. 주요 폴더 설명

#### config/domains

- 본 서비스에서 관리할 전광판 도메인 정보 기입
- 새로운 전광판 추가 시, 해당 domains 파일 수정 필요

#### domains/{개별도메인명}/Display

- 도메인별 전광판 컴포넌트와 로직을 분리하여 관리
- 도메인별로 필요한 컴포넌트를 캡슐화
- - 각 도메인은 독립적으로 동작하며, 새로운 전광판 도메인을 쉽게 추가할 수 있는 구조

#### components/DomainDisplay

- 전광판의 기본 레이아웃과 공통 UI 컴포넌트를 관리
- 사용자가 접속한 Url에 따라 `domains/{개별도메인명}/Display` 으로 매핑하여 동적으로 컴포넌트를 넘기는 역할 수행

#### service/display/{개별도메인명}

- 각 도메인별 데이터를 가져오는 API 서비스
- 실시간 데이터 업데이트와 웹소켓 통신 등을 담당

#### app/display/{개별도메인명}

- 개별 도메인들의 전광판 접속 url 및 페이지
- 매번 파일을 추가하는 것이 아닌, 동적으로 도메인을 관리하도록 설계

## 실행 방법

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
