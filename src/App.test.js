import { render, screen } from '@testing-library/react';
import App from './App';

// 메인 페이지가 API를 호출하므로 테스트에서는 fetch를 가짜로 대체
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
  );
});

test('renders blog title', () => {
  render(<App />);
  const titleElement = screen.getByText(/미니 블로그/);
  expect(titleElement).toBeInTheDocument();
});
