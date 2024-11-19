import React, { useState } from 'react';
import './PasswordValidator.css';

const getPasswordStrength = (password) => {
  let score = 0;

  // Check if password meets minimum criteria
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  // Check password length and return early if not valid
  if (password.length > 0 && password.length <= 4) return 'Not Valid';
  if (password.length >= 5) score++;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Additional checks for character requirements
  if (hasUpperCase) score++;
  if (hasLowerCase) score++;
  if (hasNumber) score++;
  if (hasSpecialChar) score++;

  // Determine strength based on score
  if (score === 1) return 'Good';
  if (score === 2) return 'Very Good';
  if (score === 3) return 'Strong';
  if (score >= 4) return 'Excellent';

  return 'Not Valid';
};

const PasswordValidator = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const strength = getPasswordStrength(password);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container">
      <h2>Password Validator</h2>
      <div className="input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
      <button
  type="button"
  className="toggle-password"
  onClick={togglePasswordVisibility}
>
  {showPassword ? (
    <i className="fas fa-eye-slash"></i> // Eye off icon
  ) : (
    <i className="fas fa-eye"></i> // Eye on icon
  )}
</button>

      </div>
      {password && (
        <div className={`strength ${strength.replace(/\s+/g, '-').toLowerCase()}`}>
          Password strength: <strong>{strength}</strong>
        </div>
      )}
      {/* Password Requirements */}
      <ul className="requirements">
        <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
          At least one uppercase letter
        </li>
        <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
          At least one lowercase letter
        </li>
        <li className={/[0-9]/.test(password) ? 'valid' : 'invalid'}>
          At least one number
        </li>
        <li className={/[^A-Za-z0-9]/.test(password) ? 'valid' : 'invalid'}>
          At least one special character
        </li>
        <li className={password.length >= 8 ? 'valid' : 'invalid'}>
          Minimum 8 characters
        </li>
      </ul>
      
    </div>
  );
};

export default PasswordValidator;
