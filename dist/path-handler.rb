lambda do |env|
    if env["PATH_INFO"] == "/"
        return [301, {"location" => "/index.📄"}, []]
    end

    if /^(.*)\/([^\/]*)\.%F0%9F%93%84$/.match(env["PATH_INFO"])
      return [307, {"x-reproxy-url" => "#{$1}/#{$2}.html"}, []]
    end
    

    if /^(.*)\/([^\/]*)\.%F0%9F%93%9C$/.match(env["PATH_INFO"])
      return [307, {"x-reproxy-url" => "#{$1}/#{$2}.js"}, []]
    end
    

    if /^(.*)\/([^\/]*)\.%E2%9A%99$/.match(env["PATH_INFO"])
      return [307, {"x-reproxy-url" => "#{$1}/#{$2}.js"}, []]
    end
    

    if /^(.*)\/([^\/]*)\.%F0%9F%8E%A8$/.match(env["PATH_INFO"])
      return [307, {"x-reproxy-url" => "#{$1}/#{$2}.gif"}, []]
    end
    

    if /^(.*)\/([^\/]*)\.%F0%9F%93%B7$/.match(env["PATH_INFO"])
      return [307, {"x-reproxy-url" => "#{$1}/#{$2}.jpg"}, []]
    end
    

    if /^(.*)\/([^\/]*)\.%F0%9F%96%BC$/.match(env["PATH_INFO"])
      return [307, {"x-reproxy-url" => "#{$1}/#{$2}.png"}, []]
    end
    
    return [399, {}, []]
end
