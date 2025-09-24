# Screens Module

This directory contains all screen components organized into logical modules for better maintainability and organization.

## Module Structure

### 📁 auth/
Authentication-related screens
- `Login.tsx` - User login screen

### 📁 cards/
Loyalty card management screens
- `Home.tsx` - Main dashboard with cards grid
- `CardDetail.tsx` - Individual card details view
- `AddCard.tsx` - Add new loyalty card screen

### 📁 profile/
User profile and settings screens
- `Profile.tsx` - User profile display
- `Settings.tsx` - Application settings

### 📁 stores/
Store-related screens
- `StoreLookupList.tsx` - Browse and select stores

### 📁 shared/
Common screens used across the app
- `NotFound.tsx` - 404 error screen
- `Updates.tsx` - Notifications and updates

### 📁 shopping/
Shopping-related screens
- `ShoppingList.tsx` - Shopping list management

## Usage

Import screens from their respective modules:

```typescript
// Import from specific module
import { Login } from './auth';
import { Home, CardDetail } from './cards';

// Or import all screens from main index
import { Login, Home, CardDetail, Profile, Settings } from './screens';
```

## Benefits of Module Organization

1. **Better Maintainability**: Related screens are grouped together
2. **Clearer Dependencies**: Easy to see which screens belong to which feature
3. **Easier Navigation**: Developers can quickly find relevant screens
4. **Scalability**: Easy to add new screens to existing modules
5. **Team Collaboration**: Different team members can work on different modules
