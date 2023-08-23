import { render, screen } from '@testing-library/react';
import ErrorCommentsScreen from './error-comments-screen';

describe('Component: Error Comments Screen', () => {
  it('should render correct', () => {
    const expectedText = /Не удалось загрузить. Обновите страницу или попробуйте позже/i;
    render(<ErrorCommentsScreen />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
