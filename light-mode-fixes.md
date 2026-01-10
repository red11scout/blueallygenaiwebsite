# Light Mode Issues to Fix

## Observed Problems:
1. Hero section text is invisible - white text on light background
2. Step headers/titles are not visible
3. Card content may have contrast issues
4. The background image is too light/washed out in light mode

## Root Cause:
- Components use `text-foreground` which is light in dark mode
- Background gradients and overlays need light mode variants
- Hero section needs dark text in light mode

## Fix Strategy:
1. Update Step0Diagnostic to use dark text in light mode
2. Update all step components to ensure proper text contrast
3. Add light mode specific background treatments
4. Ensure glass-card has proper contrast in light mode
