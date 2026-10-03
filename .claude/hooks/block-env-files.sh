#!/usr/bin/env bash
# PreToolUse hook for Bash: refuse any command that names a .env file.
# .env.sample and .env.example hold no secrets and stay usable.
command=$(jq -r '.tool_input.command // ""')

# ".env" as a file name (after start, space, quote, slash, =, etc.), optionally with a suffix
# like .env.local; "import.meta.env" is not matched because a letter precedes the dot.
matches=$(printf '%s' "$command" | grep -oE '(^|[^A-Za-z0-9_.-])\.env(\.[A-Za-z0-9_.-]+)?' | sed -E 's/^[^.]//')

for name in $matches; do
    case "$name" in
        .env.sample | .env.example) ;;
        *)
            jq -n --arg name "$name" '{
                hookSpecificOutput: {
                    hookEventName: "PreToolUse",
                    permissionDecision: "deny",
                    permissionDecisionReason: ("Bloqueado: los archivos .env (" + $name + ") no se leen ni se modifican desde Claude Code. Pedile al usuario que lo haga.")
                }
            }'
            exit 0
            ;;
    esac
done

exit 0
