#!/usr/bin/env node

/**
 * 프로젝트 전체 시작 스크립트
 * 프론트엔드와 백엔드를 동시에 실행합니다.
 */

import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = __dirname

// 프로세스 참조 저장
const processes = []

// 정리 함수
const cleanup = () => {
  console.log('\n🛑 서버를 종료합니다...')
  processes.forEach(proc => {
    if (proc) proc.kill()
  })
  process.exit(0)
}

// Ctrl+C 핸들러
process.on('SIGINT', cleanup)

// 프로세스 시작
const startBackend = () => {
  console.log('\n🚀 백엔드 시작 중...')
  const backend = spawn('pnpm', ['run', 'dev'], {
    cwd: path.join(PROJECT_ROOT, 'backend'),
    stdio: 'inherit',
    shell: true
  })
  processes.push(backend)

  backend.on('error', (err) => {
    console.error('❌ 백엔드 에러:', err)
  })
}

const startFrontend = () => {
  console.log('🚀 프론트엔드 시작 중...')
  const frontend = spawn('pnpm', ['run', 'dev'], {
    cwd: path.join(PROJECT_ROOT, 'frontend'),
    stdio: 'inherit',
    shell: true
  })
  processes.push(frontend)

  frontend.on('error', (err) => {
    console.error('❌ 프론트엔드 에러:', err)
  })
}

console.log('╔═══════════════════════════════════════╗')
console.log('║     단어 폭탄 게임 - 개발 서버      ║')
console.log('╚═══════════════════════════════════════╝\n')

console.log('📋 시작 중...')
console.log('  🔗 프론트엔드: http://localhost:5173')
console.log('  🔗 백엔드: http://localhost:3001')
console.log('  💡 Ctrl+C를 눌러 종료할 수 있습니다\n')

// 서버 시작 (동시에, 약간의 딜레이 있음)
startBackend()
setTimeout(startFrontend, 1000)
