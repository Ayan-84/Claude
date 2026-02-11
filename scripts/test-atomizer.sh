#!/bin/bash
# ==============================================
# Test Script: Content Atomizer Webhook Trigger
# Usage: ./test-atomizer.sh [flow-id]
# Requires: Langflow running at localhost:7860
# ==============================================

FLOW_ID="${1:-YOUR_FLOW_ID_HERE}"
LANGFLOW_URL="http://localhost:7860/api/v1/run/${FLOW_ID}"

# Sample content for testing (replace with your own pillar content)
read -r -d '' TEST_CONTENT << 'EOF'
Why Most Automation Fails

Most automation projects fail not because the technology is wrong, but because the scope is wrong. Teams try to automate ambiguity — processes that are not yet well-defined, decisions that still require human judgment, workflows that change every week.

The fix is simple but counterintuitive: automate the boring parts first. The repetitive, well-defined, low-judgment tasks that eat hours every week. Content reformatting. Data entry. Status updates. Report generation. These are the tasks where automation delivers immediate, measurable value.

Once the boring parts are automated, something interesting happens. The team has more time and attention for the complex work. And with that clarity, they start to see which complex processes actually have automatable components — components they could not see before because they were buried under manual busywork.

The pattern is: automate the obvious, observe what emerges, then automate the next layer. Not: plan the perfect end-state and try to build it all at once.

Research from McKinsey suggests that 45% of work activities could be automated using current technology, but only about 5% of occupations could be fully automated. The gap between those numbers is where most automation projects get stuck — they aim for full automation when partial automation would deliver 80% of the value.

Start small. Automate one boring task this week. See what it frees up. Then decide what to automate next.
EOF

echo "Testing Content Atomizer webhook..."
echo "Endpoint: ${LANGFLOW_URL}"
echo "---"

curl -s -X POST "${LANGFLOW_URL}" \
  -H "Content-Type: application/json" \
  -d "{\"input_value\": $(echo "$TEST_CONTENT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')}" \
  | python3 -m json.tool

echo ""
echo "---"
echo "Test complete. Check output above for atomized content."
