import { validateLogin, validateRegister } from '../middleware/validateAuth';

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('validateRegister', () => {
  it('rejects weak passwords and invalid email', () => {
    const req = {
      body: {
        email: 'not-an-email',
        name: 'A',
        password: 'short',
        confirmPassword: 'short',
      },
    } as any;
    const res = mockResponse();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('normalizes valid registration input', () => {
    const req = {
      body: {
        email: 'User@Example.com',
        name: 'Cheng Yi',
        password: 'securePass1',
        confirmPassword: 'securePass1',
      },
    } as any;
    const res = mockResponse();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.body.email).toBe('user@example.com');
  });
});

describe('validateLogin', () => {
  it('requires email and password', () => {
    const req = { body: { email: '', password: '' } } as any;
    const res = mockResponse();
    const next = jest.fn();

    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
