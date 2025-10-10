#!/usr/bin/env node

import pc from 'picocolors';
import prompts from 'prompts';
import { spawn } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const REPO_URL = 'https://github.com/sh-oon/next-ts-boilerplate.git';

async function replaceInFile(filePath: string, oldValue: string, newValue: string): Promise<void> {
  const content = await readFile(filePath, 'utf-8');
  const regex = new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const newContent = content.replace(regex, newValue);
  await writeFile(filePath, newContent, 'utf-8');
}

async function replaceInDirectory(dir: string, oldValue: string, newValue: string): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.yarn') {
        continue;
      }
      await replaceInDirectory(fullPath, oldValue, newValue);
    } else if (
      entry.name.endsWith('.ts') ||
      entry.name.endsWith('.tsx') ||
      entry.name.endsWith('.js') ||
      entry.name.endsWith('.jsx') ||
      entry.name.endsWith('.json') ||
      entry.name.endsWith('.md')
    ) {
      await replaceInFile(fullPath, oldValue, newValue);
    }
  }
}

function runCommand(command: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
        return;
      }
      resolve();
    });
  });
}

async function main() {
  console.log(pc.cyan('\n🚀 Hono Boilerplate CLI\n'));

  const args = process.argv.slice(2);
  let projectName = args[0];

  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: '프로젝트 이름을 입력하세요:',
      initial: 'my-monorepo',
      validate: (value) => /^[a-z0-9-]+$/.test(value) || '소문자, 숫자, 하이픈만 사용 가능합니다',
    });

    if (!response.projectName) {
      console.log(pc.red('\n❌ 프로젝트 생성이 취소되었습니다.\n'));
      process.exit(0);
    }

    projectName = response.projectName;
  }

  const response = await prompts({
    type: 'text',
    name: 'orgName',
    message: '조직명을 입력하세요 (예: mycompany):',
    initial: projectName,
    validate: (value) => /^[a-z0-9-]+$/.test(value) || '소문자, 숫자, 하이픈만 사용 가능합니다',
  });

  if (!response.orgName) {
    console.log(pc.red('\n❌ 프로젝트 생성이 취소되었습니다.\n'));
    process.exit(0);
  }

  const { orgName } = response;
  const targetDir = resolve(process.cwd(), projectName);

  console.log(pc.blue(`\n📦 프로젝트 생성 중: ${projectName}`));
  console.log(pc.blue(`📁 위치: ${targetDir}`));
  console.log(pc.blue(`🏢 조직명: @${orgName}\n`));

  // 1. GitHub에서 클론
  console.log(pc.green('📋 GitHub에서 템플릿 클론 중...'));
  try {
    await runCommand('git', ['clone', '--depth=1', REPO_URL, projectName], process.cwd());
    // .git 디렉토리 제거 (새 git history 시작)
    await runCommand('rm', ['-rf', '.git'], targetDir);
  } catch (error) {
    console.error(pc.red('\n❌ GitHub 클론 실패:'), error);
    process.exit(1);
  }

  // 2. create-hono-boilerplate 패키지 제거
  console.log(pc.green('🗑️  불필요한 파일 정리 중...'));
  await runCommand('rm', ['-rf', 'packages/create-hono-boilerplate'], targetDir);

  // 3. 조직명 변경
  console.log(pc.green(`🔄 @mono를 @${orgName}로 변경 중...`));
  await replaceInDirectory(targetDir, '@mono', `@${orgName}`);

  // 4. package.json의 name 변경
  const pkgJsonPath = join(targetDir, 'package.json');
  await replaceInFile(pkgJsonPath, '"name": "hono-boilerplate"', `"name": "${projectName}"`);

  // 5. git 초기화
  console.log(pc.green('🔧 Git 초기화 중...'));
  await runCommand('git', ['init'], targetDir);

  // 6. 의존성 설치
  console.log(pc.green('\n📦 의존성 설치 중...\n'));
  try {
    await runCommand('corepack', ['enable'], targetDir);
    await runCommand('yarn', ['install'], targetDir);
  } catch (_error) {
    console.log(pc.yellow('\n⚠️  의존성 설치에 실패했습니다. 수동으로 설치해주세요:\n'));
    console.log(pc.dim(`  cd ${projectName}`));
    console.log(pc.dim('  corepack enable'));
    console.log(pc.dim('  yarn install\n'));
  }

  // 완료 메시지
  console.log(pc.green('\n✨ 프로젝트 생성 완료!\n'));
  console.log(pc.cyan('다음 단계:\n'));
  console.log(pc.dim(`  cd ${projectName}`));
  console.log(pc.dim('  yarn dev\n'));
  console.log(pc.blue('🎉 즐거운 코딩 되세요!\n'));
}

main().catch((error) => {
  console.error(pc.red('\n❌ 오류 발생:'), error);
  process.exit(1);
});
