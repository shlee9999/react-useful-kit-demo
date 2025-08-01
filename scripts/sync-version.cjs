#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * react-useful-kit 라이브러리의 버전과 package.json의 버전을 동기화하는 스크립트
 */
function syncVersion() {
  try {
    // package.json 파일 읽기
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // react-useful-kit 의존성에서 버전 추출
    const reactUsefulKitVersion = packageJson.dependencies['react-useful-kit'];

    if (!reactUsefulKitVersion) {
      console.log('❌ react-useful-kit 의존성을 찾을 수 없습니다.');
      return;
    }

    // 버전에서 ^, ~, >= 등의 범위 지정자 제거
    const cleanVersion = reactUsefulKitVersion.replace(/^[\^~>=<]+/, '');

    // 현재 package.json 버전과 비교
    if (packageJson.version === cleanVersion) {
      console.log(`✅ 버전이 이미 동기화되어 있습니다: ${cleanVersion}`);
      return;
    }

    // 버전 업데이트
    packageJson.version = cleanVersion;

    // package.json 파일 쓰기 (들여쓰기 2칸 유지)
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    console.log(`🔄 버전을 ${packageJson.version}에서 ${cleanVersion}로 업데이트했습니다.`);
    console.log(`📦 react-useful-kit: ${reactUsefulKitVersion}`);
    console.log(`📋 package.json: ${cleanVersion}`);
  } catch (error) {
    console.error('❌ 버전 동기화 중 오류가 발생했습니다:', error.message);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 실행
if (require.main === module) {
  syncVersion();
}

module.exports = { syncVersion };
