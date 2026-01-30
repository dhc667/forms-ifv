# Phase 2: Core Components Migration Plan

## **Migration Plan: From Figma App to Forms-Front**

### **Current State Analysis**
- **Source**: `figma/` directory uses React Router v6 with createBrowserRouter
- **Target**: `forms-front/` uses React Router 7 file-based routing
- **Theme**: Need to migrate from hardcoded IFV colors to our enhanced dark mode theme system

### **Phase 2: Core Components Migration Strategy**

#### **Priority 1: Essential Components**
1. **Header Component** (`figma/src/app/components/Header.tsx`)
   - Convert from React Router v6 Link to React Router 7 Link
   - Replace hardcoded `[#1a6e7c]` with our CSS custom properties
   - Add theme switcher integration
   - Update search/filter functionality to use our input components

2. **TableView Component** (`figma/src/app/components/TableView.tsx`)
   - Convert hardcoded colors to IFV theme variables
   - Integrate with our enhanced dark mode (`#0a2e35` backgrounds)
   - Use our table styling system
   - Maintain sorting functionality

3. **Routing Structure**
   - Add 4 new routes to `forms-front/app/routes.ts`:
     - `/schemas` (esquemas)
     - `/create-schema` (crear-esquemas)
     - `/forms` (formularios)
     - `/my-forms` (mis-formularios)

#### **Priority 2: Page Components**
4. **FormsPage** → `routes/forms.tsx`
   - Simple wrapper: Header + TableView
   - Replace hardcoded backgrounds

5. **SchemasPage** → `routes/schemas.tsx`
   - Basic page with Header
   - Use our theme system instead of `bg-[#e8f4f6]`

6. **MyFormsPage** → `routes/my-forms.tsx`
   - Basic page with Header
   - Use Card component from our UI library

7. **CreateSchemaPage** → `routes/create-schema.tsx`
   - Most complex: Header + Sidebar + QuestionCard components
   - Need to migrate Sidebar and QuestionCard components

#### **Priority 3: Complex Components**
8. **Sidebar Component** (`figma/src/app/components/Sidebar.tsx`)
   - Convert to use our button, input components
   - Theme-aware colors with dark mode
   - Tab functionality

9. **QuestionCard Component** (`figma/src/app/components/QuestionCard.tsx`)
   - Use our button, input components
   - Theme-aware colors and hover states

### **Theme Migration Strategy**

#### **Color Mapping (Figma → Forms-Front)**
```css
/* Old hardcoded colors → New theme variables */
[#1a6e7c] → --primary / hsl(193, 61%, 34%)        /* Main IFV blue */
[#5da5b3] → --primary-light / hsl(193, 42%, 53%)  /* Lighter IFV blue */
[#b8e5ed] → --primary-lighter / hsl(193, 55%, 83%) /* Very light IFV blue */
[#e8f4f6] → --muted (light mode) / --background (dark mode)
[#4a8a96] → --primary-dark / hsl(193, 36%, 40%)   /* Darker IFV blue */
[#155962] → --primary-darker / hsl(193, 61%, 24%)  /* Darkest IFV blue */
```

#### **Dark Mode Integration**
- All components must work with our enhanced dark mode (`#0a2e35` background)
- Use `bg-background`, `text-foreground`, `border-border` tokens
- Maintain the darker button colors we implemented in Phase 1

### **Implementation Order**

1. **Update routes.ts** - Add 4 new routes
2. **Migrate Header** - Theme-aware, RR7 compatible, with theme switcher
3. **Migrate TableView** - Theme-aware table with sorting
4. **Create simple pages** - forms.tsx, schemas.tsx, my-forms.tsx
5. **Migrate complex components** - Sidebar, QuestionCard
6. **Create create-schema.tsx** - Most complex page with all components
7. **Update debug pages** - Add migration test pages
8. **Test navigation** - Verify all routes work with theme switching

### **File Structure After Migration**
```
forms-front/app/
├── components/
│   ├── Header.tsx (migrated)
│   ├── TableView.tsx (migrated)
│   ├── Sidebar.tsx (migrated)
│   └── QuestionCard.tsx (migrated)
├── routes/
│   ├── forms.tsx (new)
│   ├── schemas.tsx (new)
│   ├── my-forms.tsx (new)
│   └── create-schema.tsx (new)
└── routes.ts (updated)
```

### **Key Technical Decisions**
- **Maintain Functionality**: Keep all sorting, tabs, state management from original
- **Theme Integration**: Use CSS custom properties instead of hardcoded colors
- **Component Reuse**: Leverage our UI library (buttons, inputs, cards)
- **Dark Mode**: Ensure everything works with our enhanced dark theme
- **TypeScript**: Maintain strong typing throughout migration

This plan will transform the hardcoded Figma prototype into a production-ready, theme-aware application with proper React Router 7 integration and our enhanced IFV dark mode system.</content>
<parameter name="filePath">/home/dhc/Desktop/Projects/forms-ifv/forms-front/phase2.md