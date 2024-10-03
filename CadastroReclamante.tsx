import React, { useState, useCallback } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, FormFeedback, Alert, Spinner } from 'reactstrap';

interface FormData {
  nome: string;
  email: string;
  password: string;
}

interface Errors {
  [key: string]: string;
}

const CadastroReclamante: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = (email: string): string | null => {
    const re = /^[^\s@]+@([^\s@]+\.)*ufs\.br$/;
    if (!email.trim()) return 'E-mail é obrigatório';
    if (!re.test(email)) return 'O e-mail deve terminar com ufs.br';
    return null;
  };

  const validatePassword = (password: string): string | null => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password.trim()) return 'Senha é obrigatória';
    if (!re.test(password)) return 'Senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um símbolo';
    return null;
  };

  const validateNome = (nome: string): string | null => {
    const re = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nome.trim()) return 'Nome é obrigatório';
    if (!re.test(nome)) return 'Nome deve conter apenas letras';
    return null;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'nome') {
      const filteredValue = value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
      setFormData({ ...formData, [name]: filteredValue });
      const nomeError = validateNome(filteredValue);
      setErrors((prevErrors) => ({ ...prevErrors, nome: nomeError || '' }));
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === 'password') {
        const passwordError = validatePassword(value);
        setErrors((prevErrors) => ({ ...prevErrors, password: passwordError || '' }));
      }

      if (name === 'email') {
        const emailError = validateEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: emailError || '' }));
      }
    }
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const nomeError = validateNome(formData.nome);

    if (nomeError) newErrors.nome = nomeError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage(null);
      return;
    }

    setLoading(true);
    setErrors({});


    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Cadastro realizado com sucesso!');
    }, 2000);
  };

  return (
    <Container className="d-flex flex-column align-items-center" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4" style={{ color: '#2113E8', fontWeight: 'bold' }}>Cadastro de Reclamante</h2>
      {successMessage && <Alert color="success" aria-live="polite">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit} className="w-100">
        <FormGroup>
          <Label for="nome">Nome:</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            invalid={!!errors.nome}
          />
          <FormFeedback>{errors.nome}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">E-mail:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            invalid={!!errors.email}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            invalid={!!errors.password}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        <Button
          color="primary"
          type="submit"
          className="w-100"
          disabled={loading}
          style={{ backgroundColor: '#2113E8', borderColor: '#2113E8' }}
        >
          {loading ? <Spinner size="sm" /> : 'Cadastrar'}
        </Button>
      </Form>
    </Container>
  );
};

export default CadastroReclamante;
