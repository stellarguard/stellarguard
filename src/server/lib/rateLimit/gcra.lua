local rate_limit_key = KEYS[1]
local now = ARGV[1]
local burst = ARGV[2]
local rate = ARGV[3]
local period = ARGV[4]
local cost = ARGV[5]

local emission_interval = period / rate
local increment = emission_interval * cost
local burst_offset = emission_interval * burst

local tat = redis.call("GET", rate_limit_key)

if not tat then
    tat = now
else
    tat = tonumber(tat)
end

tat = math.max(tat, now)

local new_tat = tat + increment
local allow_at = new_tat - burst_offset
local diff = now - allow_at

local retry_in
local reset_in
local remaining
local limited

if diff < 0 then
    limited = 1
    if increment <= burst_offset then
        retry_in = diff * -1
    else
        retry_in = -1
    end
    reset_in = tat - now
    remaining = 0
else
    limited = 0
    retry_in = 0
    reset_in = new_tat - now
    remaining = math.floor(diff / emission_interval + 0.5) -- poor man's round
    if increment > 0 then
        redis.call("SET", rate_limit_key, new_tat, "EX", reset_in)
    end
end

return {limited, remaining, retry_in, reset_in}
