import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, type FieldValues, type Path } from 'react-hook-form';
import Input from '../Input';

// Wrapper to provide react-hook-form context
const InputWrapper = <T extends FieldValues>({
  name,
  label,
  rules,
  placeholder,
}: {
  name: Path<T>;
  label?: string;
  rules?: any;
  placeholder?: string;
}) => {
  const { control, handleSubmit } = useForm<T>();
  const onSubmit = jest.fn();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input<T>
        name={name}
        control={control}
        label={label}
        rules={rules}
        placeholder={placeholder}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('Input component', () => {
  test('renders label and placeholder', () => {
    render(
      <InputWrapper name="username" label="Username" placeholder="Enter name" />
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter name/i)).toBeInTheDocument();
  });

  test('shows required validation error on submit', async () => {
    render(
      <InputWrapper
        name="username"
        label="Username"
        rules={{ required: 'Required!' }}
      />
    );

    userEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByRole('alert')).toHaveTextContent('Required!');
  });

  test('accepts user input', async () => {
    render(<InputWrapper name="username" label="Username" />);

    const input = screen.getByLabelText(/Username/i) as HTMLInputElement;
    await userEvent.type(input, 'Test User');

    expect(input.value).toBe('Test User');
  });
});
