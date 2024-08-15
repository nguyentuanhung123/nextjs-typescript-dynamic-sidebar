This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Set-up tailwind

- B1: Set-up trong tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          active: "#6b32ce",
          background: "#f5f5ff",
          iconColor: "636c80"
        }
      }
    },
  },
  plugins: [],
};
export default config;
```

- B2: Áp dụng

```tsx
const Sidebar = () => {
  return (
    <div className='text-sidebar-active'>Sidebar</div>
  )
}

export default Sidebar
```

## Trong CSS Flexbox, nếu bạn có một phần tử div với thuộc tính display: flex và flex-direction: column, các phần tử con của nó không tự động có width: 100%.

- Tuy nhiên, các phần tử con sẽ có width bằng chiều rộng của phần tử cha nếu bạn không chỉ định giá trị cụ thể cho width của chúng. Điều này xảy ra vì trong Flexbox, các phần tử con trong một container có flex-direction: column sẽ tự động mở rộng để chiếm hết chiều rộng của phần tử cha (nếu chiều rộng của phần tử cha được đặt).

- Nếu bạn muốn đảm bảo các phần tử con có chiều rộng 100% của phần tử cha, bạn có thể chỉ định width: 100% cho các phần tử con. - 

- Trong Sidebar.tsx

```tsx
<div className="flex flex-col space-y-10 w-full">
    <img className="h-10 w-fit" src="/logo-expanded.png" alt="logo"/>
</div>
```

- Nếu ta xóa w-fit của img thì img sẽ mở rộng đến 100% chiều rộng của cha

## Lưu ý: Component SidebarItem là component con có "use-client" nên thằng cha là component Sidebar cũng phải có "use-client" nếu không sẽ có lỗi : Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.

- Để sử dụng một component có 'use client' trong một component cha không có 'use client', bạn cần đảm bảo rằng component cha sẽ được render trên client và có thể chứa các component con client-side.

- Điều quan trọng là bạn phải hiểu rằng việc có 'use client' trong một component ảnh hưởng đến cách mà component đó được xử lý bởi Next.js, và đôi khi có thể cần phải cấu hình hoặc thay đổi cách tổ chức các component để đạt được hiệu quả mong muốn trong ứng dụng của bạn.

- Tóm lại:

- Nếu bạn có một component con với 'use client', component cha không bắt buộc phải có 'use client'.
- Tuy nhiên, nếu bạn muốn component cha và con đều được xử lý ở phía client, thì cả hai nên có 'use client'.

-Cấu trúc hợp lý sẽ giúp bạn tránh các lỗi không mong muốn và đảm bảo ứng dụng hoạt động như dự kiến.

## useMemo

```tsx
const pathName = usePathname();

const router = useRouter();

const isActive = useMemo(() => {
    return path === pathName;
}, [path, pathName])
```

- Đoạn mã bạn cung cấp sử dụng hook useMemo của React để tối ưu hóa hiệu suất bằng cách ghi nhớ giá trị của biến isActive chỉ khi các phụ thuộc [path, pathName] thay đổi. Cách sử dụng useMemo này có thể giúp cải thiện hiệu suất khi tính toán giá trị của `isActive là đắt đỏ hoặc khi bạn muốn tránh việc tái tính toán không cần thiết.

## Giải thích
- useMemo là một hook giúp tối ưu hóa hiệu suất bằng cách ghi nhớ (memoize) một giá trị được tính toán cho đến khi một trong các phụ thuộc thay đổi.
- path và pathName là các biến phụ thuộc. Khi một trong hai giá trị này thay đổi, giá trị của isActive sẽ được tái tính toán.

## Khi nào nên sử dụng useMemo?
- Khi việc tính toán giá trị là đắt đỏ về mặt hiệu suất.
- Khi bạn muốn tránh việc tái tính toán không cần thiết nếu các phụ thuộc không thay đổi.

- Trong trường hợp của bạn, so sánh đơn giản path === pathName không phải là một phép toán đắt đỏ, nên việc sử dụng useMemo có thể không mang lại lợi ích hiệu suất lớn. Tuy nhiên, nếu bạn đang làm việc trong một ứng dụng lớn hơn và có nhiều phép toán phức tạp hoặc các tình huống khác, thì useMemo có thể là một công cụ hữu ích.

-  useMemo là một hook trong React được thiết kế để tối ưu hóa hiệu suất bằng cách ghi nhớ (memoize) giá trị tính toán để tránh việc tái tính toán không cần thiết. Dưới đây là một số lý do và tình huống mà bạn có thể cần useMemo:

1. Tối ưu hóa hiệu suất

- Khi một phép toán tính toán giá trị hoặc tạo ra một đối tượng phức tạp, việc thực hiện phép toán này nhiều lần có thể ảnh hưởng đến hiệu suất. useMemo giúp giảm bớt việc tái tính toán bằng cách lưu trữ giá trị đã tính toán và chỉ cập nhật khi các phụ thuộc thay đổi.

2. Tránh render lại component con

- Trong một số trường hợp, nếu bạn truyền đối tượng hoặc hàm từ component cha xuống component con, việc tái tạo đối tượng hoặc hàm mỗi lần render có thể dẫn đến việc component con bị render lại không cần thiết. useMemo giúp đảm bảo rằng đối tượng hoặc hàm không thay đổi trừ khi các phụ thuộc thay đổi, từ đó giúp giảm số lần render lại.

3. Tối ưu hóa các phép toán phức tạp
- Nếu bạn có các phép toán phức tạp hoặc các phép toán dựa trên dữ liệu lớn, useMemo có thể giúp đảm bảo rằng các phép toán này chỉ được thực hiện lại khi cần thiết, làm giảm thời gian tính toán tổng thể.

4. Tạo các giá trị cố định
- Khi bạn cần tạo ra các giá trị cố định (như đối tượng hoặc mảng) mà không thay đổi trừ khi một số phụ thuộc cụ thể thay đổi, useMemo có thể giúp giữ cho giá trị này không thay đổi giữa các lần render trừ khi các phụ thuộc thay đổi.

```jsx
import React, { useMemo } from 'react';

const MyComponent = ({ data }) => {
    // Giả sử `processData` là một hàm phức tạp hoặc tốn thời gian
    const processedData = useMemo(() => processData(data), [data]);

    return (
        <div>
            {processedData.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};
```

- Trong ví dụ này, processData sẽ chỉ được gọi lại khi data thay đổi, giúp tránh việc tính toán lại không cần thiết khi component render lại.

## Khi nào không nên sử dụng useMemo?
- Nếu giá trị được tính toán là đơn giản hoặc tính toán không tốn nhiều tài nguyên, việc sử dụng useMemo có thể không mang lại lợi ích hiệu suất đáng kể và có thể làm mã của bạn trở nên phức tạp hơn không cần thiết.
- Nếu bạn chỉ đang làm việc với các giá trị cơ bản (như số, chuỗi, boolean) hoặc các đối tượng nhỏ, việc sử dụng useMemo có thể không cần thiết.

## Tóm lại, useMemo là một công cụ hữu ích khi bạn cần tối ưu hóa hiệu suất cho các phép toán phức tạp hoặc khi bạn muốn tránh việc tái tạo các giá trị không cần thiết.

## Ta có đoạn code hay

```tsx
const onClick = () => {

    if(items && items.length > 0) {
        return setExpanded(!expanded);
    }
    router.push(path);
}
```

- Khi ta bấm vào một menu có không SubmenuItem thì nó sẽ chuyển trang, còn khi ta bấm vào một menu có SubmenuItem thì ta sẽ hiện những SubmenuItem đó và không chuyển trang

## Bug : Khi ta bấm vào 1 submenu thì thằng cha đang không có màu.

- Ban đầu

```tsx
const isActive = useMemo(() => {
    return path === pathName;
}, [path, pathName])
```

- Sửa lại

```tsx
const isActive = useMemo(() => {
    if (items && items.length > 0) {
        return items.some((item) => item.path === pathName);
    }
    return path === pathName;
}, [path, pathName, items]);
    
useEffect(() => {
    if (isActive) {
        setExpanded(true);
    }
}, [isActive]);
```

## Ban đầu ta có đoạn mã như bên dưới. Đoạn mã bạn cung cấp sử dụng useMemo để tính toán giá trị của biến isActive. Dưới đây là cách mà useMemo hoạt động trong trường hợp này và một số điểm cần lưu ý:

```tsx
const isActive = useMemo(() => {
    if (items && items.length > 0) {
        if (items.find((item) => item.path === pathName)) {
            setExpanded(true);
            return true;
        }
    }

    return path === pathName;
}, [path, pathName, items]);
```

## Những điểm cần lưu ý

- Ghi nhớ giá trị tính toán: useMemo giúp tránh việc tái tính toán giá trị của isActive nếu các phụ thuộc không thay đổi, giúp cải thiện hiệu suất nếu tính toán hoặc kiểm tra là đắt đỏ.
- Cập nhật trạng thái: Việc gọi setExpanded(true) trong useMemo có thể gây vấn đề vì useMemo không nên được sử dụng để cập nhật trạng thái. useMemo chỉ nên được sử dụng để ghi nhớ giá trị tính toán. Nếu cần cập nhật trạng thái dựa trên một điều kiện, bạn nên sử dụng useEffect hoặc các hooks khác thay vì useMemo.
- Tối ưu hóa hiệu suất: Nếu phép toán trong useMemo là nhẹ nhàng và không tốn nhiều tài nguyên, việc sử dụng useMemo có thể không mang lại lợi ích lớn về hiệu suất. Tuy nhiên, nếu bạn thấy rằng việc kiểm tra items và cập nhật trạng thái là đắt đỏ và xảy ra thường xuyên, việc sử dụng useMemo có thể giúp cải thiện hiệu suất.
- Đảm bảo tính chính xác: Đảm bảo rằng path, pathName, và items là các giá trị mà bạn muốn theo dõi sự thay đổi để tính toán lại giá trị của isActive.

## Như vậy, việc sử dụng useMemo trong trường hợp này có thể giúp tránh tính toán lại không cần thiết, nhưng hãy chắc chắn rằng bạn không sử dụng nó để cập nhật trạng thái, mà thay vào đó nên sử dụng các hook phù hợp như useEffect cho việc đó.

