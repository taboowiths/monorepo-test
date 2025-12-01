# monorepo-test
모노레포를 더 잘 활용하고 싶어 이것저것 테스트합니다.

# Changesets 테스트 시나리오

## 초기 설정
```bash
# 1. 의존성 설치
pnpm install

# 2. 패키지 빌드
pnpm --filter './packages/*' build

# 3. 앱 로컬 실행 테스트
pnpm --filter @test/project-a dev
pnpm --filter @test/project-b dev

# 4. develop 브랜치 생성
git checkout -b develop
git push -u origin develop
```

## 시나리오 1: react-hooks 업데이트 (Runtime 패키지)

**목표**: runtime 패키지 변경 시 앱 재배포 확인
```bash
# 1. Feature 브랜치 생성
git checkout develop
git checkout -b feature/add-use-debounce

# 2. useDebounce hook 추가
# packages/react-hooks/src/useDebounce.ts 파일 생성
cat > packages/react-hooks/src/useDebounce.ts << 'EOF'
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
EOF

# 3. index.ts에 export 추가
echo "export { useDebounce } from './useDebounce';" >> packages/react-hooks/src/index.ts

# 4. Changeset 생성
pnpm changeset

# 선택:
# - Which packages? → @test/react-hooks
# - What kind of change? → minor
# - Summary → "Added useDebounce hook for input delay handling"

# 5. 커밋 및 푸시
git add .
git commit -m "feat: add useDebounce hook"
git push -u origin feature/add-use-debounce

# 6. PR 생성 → develop으로 머지
# GitHub에서 PR 생성 후 머지

# 7. develop 브랜치 확인
git checkout develop
git pull

# 8. GitHub Actions 확인
# - develop 브랜치 워크플로우 실행 확인
# -