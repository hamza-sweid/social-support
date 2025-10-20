import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, type FieldValues, type Path } from 'react-hook-form';
import Select from '../Select';

type OptionType = { label: string; value: string };

// Wrapper to provide react-hook-form context
const SelectWrapper = <T extends FieldValues>({
  name,
  label,
  rules,
  options,
  placeholder,
  disabled,
}: {
  name: Path<T>;
  label?: string;
  rules?: any;
  options: OptionType[];
  placeholder?: string;
  disabled?: boolean;
}) => {
  const { control, handleSubmit } = useForm<T>();
  const onSubmit = jest.fn();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select<T>
        name={name}
        control={control}
        label={label}
        rules={rules}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

// Mock options
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

describe('Select component', () => {
  test('renders label and placeholder', () => {
    render(
      <SelectWrapper
        name="testSelect"
        label="Test Select"
        options={options}
        placeholder="Select..."
      />
    );

    expect(screen.getByText(/Test Select/i)).toBeInTheDocument();

    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  test('shows required validation error on submit', async () => {
    render(
      <SelectWrapper
        name="testSelect"
        label="Test Select"
        options={options}
        rules={{ required: 'Selection required!' }}
      />
    );

    userEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Selection required!'
    );
  });

  test('disabled select cannot be changed', async () => {
    render(
      <SelectWrapper
        name="testSelect"
        label="Test Select"
        options={options}
        disabled
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  test('renders asterisk when required', () => {
    render(
      <SelectWrapper
        name="testSelect"
        label="Test Select"
        options={options}
        rules={{ required: true }}
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
