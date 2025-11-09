# Contributing to Test Prep Quiz

Thank you for your interest in contributing! This project welcomes contributions of all kinds.

## Ways to Contribute

### 🎯 Question Packs
The easiest way to contribute is by adding new question packs!

1. Create a new JSON file in `server/packs/`
2. Follow the format in existing packs:
   ```json
   {
     "title": "Your Pack Title",
     "items": [
       {
         "front": "Question text?",
         "back": "Answer",
         "hint": "Optional hint",
         "choices": ["Choice A", "Choice B", "Choice C", "Choice D"],
         "answerIndex": 1,
         "tags": ["category", "topic"]
       }
     ]
   }
   ```
3. Test locally by running the server and selecting your pack
4. Submit a pull request

**Great pack ideas:**
- Subject-specific (Math, Science, History, etc.)
- Pop culture (Movies, Music, TV Shows)
- Geography (Countries, Capitals, Landmarks)
- Language learning (Vocabulary, Grammar)
- Trivia (General knowledge, Sports, etc.)

### 🎨 Themes
Create new visual themes to make the game more fun!

1. Create a new JSON file in `server/themes/`
2. Define CSS variables and effects:
   ```json
   {
     "name": "mytheme",
     "vars": {
       "--bg-color": "#1a1a2e",
       "--accent": "#6ee7b7",
       ...
     },
     "effects": {
       "confetti": true,
       "stars": false,
       ...
     }
   }
   ```
3. Test by selecting your theme when creating a room
4. Submit a pull request

**Theme ideas:**
- Seasons (Spring, Summer, Fall)
- Holidays (Christmas, Easter, New Year)
- Sports themes (Soccer, Basketball, etc.)
- Educational themes (School, Library, Lab)
- Nature themes (Forest, Desert, Jungle)

### 🐛 Bug Fixes
Found a bug? Please:

1. Check if an issue already exists
2. If not, create a new issue with:
   - Description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/device info
3. If you can fix it, submit a PR!

### ✨ New Features
Have an idea for a new feature?

1. Open an issue first to discuss it
2. Get feedback from maintainers
3. Fork the repo and create a feature branch
4. Implement your feature
5. Test thoroughly
6. Submit a pull request

## Development Setup

See the main [README.md](README.md) for setup instructions.

### Running Tests

```bash
# Web linting
cd web
npm run lint

# Build test
npm run build
```

## Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Test** your changes locally
5. **Commit** with clear messages (`git commit -m 'Add amazing feature'`)
6. **Push** to your fork (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### PR Guidelines

- Keep changes focused and atomic
- Update README if adding features
- Add comments for complex code
- Test on multiple devices/browsers if changing UI
- Follow existing code style
- Be respectful and constructive in discussions

## Code Style

- **JavaScript/React**: Follow existing patterns
- **Indentation**: 2 spaces
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Use them for complex logic
- **Commits**: Clear, descriptive messages

## Question Pack Guidelines

When creating question packs:

### Quality
- **Accuracy**: Ensure all answers are correct
- **Clarity**: Questions should be unambiguous
- **Difficulty**: Consider your audience
- **Diversity**: Include varied topics within the subject

### Format
- **4 choices**: Always provide exactly 4 answer options
- **No duplicates**: Each choice should be unique
- **Plausible distractors**: Wrong answers should be believable
- **Consistent style**: Match tone/difficulty across questions

### Content
- **Family-friendly**: Keep content appropriate for all ages
- **No bias**: Avoid controversial or offensive topics
- **Inclusive**: Consider diverse perspectives
- **Educational**: Aim to teach, not just test

## Theme Guidelines

When creating themes:

### Visual Design
- **Contrast**: Ensure text is readable on backgrounds
- **Consistency**: Colors should work together
- **Accessibility**: Consider color-blind users
- **Performance**: Limit heavy animations

### Effects
- **Subtle**: Don't overwhelm the interface
- **Relevant**: Match the theme concept
- **Optional**: Players should be able to focus on questions

## Need Help?

- Check existing issues for common questions
- Ask in the issue comments
- Be patient - maintainers are volunteers

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community

## Recognition

Contributors will be:
- Listed in release notes
- Credited in the repository
- Appreciated by the community

Thank you for making Test Prep Quiz better! 🎉
