# Fake Store

Bu proje, Next.js ve TypeScript kullanılarak geliştirilmiş basit bir e-ticaret uygulamasıdır. Ürün listeleme, filtreleme, detay sayfası, sepete ekleme ve test kapsamı gibi temel özellikleri içermektedir.

Proje Kurulumu ve Çalıştırma

### 1. Klonlama

git clone https://github.com/dev-tolgakaya/fake-store.git
cd fake-store

### 2. Bağımlılıkların Kurulumu

yarn 

### 3. Geliştirme Ortamını Başlatma

yarn dev

Tarayıcıda http://localhost:3000 adresini açarak uygulamayı görüntüleyebilirsiniz.

---

Testler

### Test Çalıştırma

yarn test

### Test İzleme Modu

yarn test:watch

### Test Kapsamı (Coverage)

yarn test:coverage

**Örnek çıktı:**

```
----------------------------------|---------|----------|---------|---------|-------------------
File                              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------------|---------|----------|---------|---------|-------------------
All files                         |    59.7 |    42.85 |      45 |      65 |
 components/atoms/Button          |   71.42 |       50 |     100 |   71.42 | 21-30
 components/atoms/Pagination      |     100 |      100 |     100 |     100 |
 components/molecules/ProductCard |     100 |      100 |     100 |     100 |
 contexts                         |   26.47 |        0 |    8.33 |   32.14 | 30-65
----------------------------------|---------|----------|---------|---------|-------------------
```

---

## ⚙️ Kullanılan Teknolojiler

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Formik](https://formik.org/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Testing Library](https://testing-library.com/)
- [Jest](https://jestjs.io/)

---

# Atomic Design Yapısı

Proje, Atomic Design prensibine göre organize edilmiştir:

src/
├── components/
│ ├── atoms/ → En küçük yapı taşları (örn: Button)
│ ├── molecules/ → Atomların birleşimi (örn: ProductCard)
│ └── organisms/ → Molekül kombinasyonları (örn: FilterSidebar)

# Proje Yapısı

```
fake-store/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── lib/
│   └── pages/
├── jest.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---
